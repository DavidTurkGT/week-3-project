//Create event listeners, attach, verify
var squares = document.querySelectorAll(".square");
var display = document.querySelector("#output");
var calc = false;

var stack = [];
var number = "";
var operator = "";
var calc = false;
/////////////////////////////////////////
// State machine breakdown:
// State 0: Inputting the first number
// State 1: Inputting the operation
// State 2: Inputting the next number
// State 3: calculation and return to State 0
var state = 0;
/////////////////////////////////////////


function addEventListeners(elements){
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click",function(){

      if(event.target.id === "C"){ clear(); return event;}
      click(event.target.id);
    });
  }
}


//This is a legacy function from my first attempt and I never changed it...oops
function click(id){
  //////////////////////////////////
  //Support Functions //////////////
  //////////////////////////////////
  function isOperatorPressed(){
    return (id === "+" ||
            id === "-" ||
            id === "*" ||
            id === "/");
  }

  function isEqualPressed(){
    return id === "=";
  }

  function isNumberPressed(){
    return parseInt(id) ? true : false;
  }

  //FIXME
  function calculate(){
    var ans;
    calc = true;
    console.log("stack length",stack.length);
    while(stack.length > 3){

      //Find all cases of multiplication and division
      console.log("Looking for mult or division...");
      for(let i = 0; i < stack.length; i++){
        if(stack[i+1] === "/"){
          console.log("found div...");
          console.log("current stack",stack);
          let calcArray = stack.splice(i,3);
          let ans = "" + (parseFloat(calcArray[0])/parseFloat(calcArray[2]));
          stack.splice(i,0,ans);
          console.log("new stack",stack);
        }
        if(stack[i+1] === "*"){
          console.log("found mult...");
          console.log("current stack",stack);
          let calcArray = stack.splice(i,3);
          let ans = "" + (parseFloat(calcArray[0])*parseFloat(calcArray[2]));
          stack.splice(i,0,ans);
          console.log("new stack",stack);
        }
      }

      //Find all cases of addition and multiplication
      for(let i = 0; i < stack.length; i++){
        if(stack[i+1] === "+"){
          console.log("found add...");
          console.log("current stack",stack);
          let calcArray = stack.splice(i,3);
          let ans = "" + (parseFloat(calcArray[0])+parseFloat(calcArray[2]));
          stack.splice(i,0,ans);
          console.log("new stack",stack);
        }
        if(stack[i+1] === "-"){
          console.log("found div...");
          console.log("current stack",stack);
          let calcArray = stack.splice(i,3);
          let ans = "" + (parseFloat(calcArray[0])-parseFloat(calcArray[2]));
          stack.splice(i,0,ans);
          console.log("new stack",stack);
        }
      }
    }
    if(stack.length > 1){
      console.log("Only one operation");
      switch(stack[1]){
        case "+":
          ans = parseFloat(stack[0])+parseFloat(stack[2]);
          break;
        case "-":
          ans = parseFloat(stack[0])-parseFloat(stack[2]);
          break;
        case "*":
          ans = parseFloat(stack[0])*parseFloat(stack[2]);
          break;
        case "/":
          ans = parseFloat(stack[0])/parseFloat(stack[2]);
          break;
        }
      }
  }
  //////////////////////////////////



  //////////////////////////////////
  //  State 0 //////////////////////
  // Enter Initial number //////////
  //////////////////////////////////
  if(state === 0){
    //Special case: check if subtraction is pressed to toggle +/- numbers
    if(id === "-"){
      if(!stack.length){
        stack.push(id);
        updateStackDisplay();
        return id;
      }
      if(stack[stack.length-1]==="-"){
        stack.pop();
        updateStackDisplay();
        return id;
      }
      //Wanting the actual subtraction operation is covered by the next conditional block
    }
    if(isOperatorPressed() && stack.length){
      stack.push(id);
      updateStackDisplay();
      state = 1;
      return id;
    }
    if(isNumberPressed()){
      if(calc){stack.pop(); calc = false;}
      stack.length ? stack.push(stack.pop()+id) : stack.push(""+id);
      updateStackDisplay();
    }

  }
  //////////////////////////////////
  //  State 1 //////////////////////
  // Define operation //////////////
  //////////////////////////////////
  else if (state === 1){
    if(isOperatorPressed()){
      stack.pop();
      stack.push(id);
      updateStackDisplay();
      return id;
    }
    if(isNumberPressed()){
      stack.push(id);
      updateStackDisplay();
      state = 2;
    }
  }
  //////////////////////////////////
  //  State 2 //////////////////////
  // Set next number ///////////////
  //////////////////////////////////
  else if (state === 2) {
    if(isNumberPressed()){
      stack.push(stack.pop() + id);
      updateStackDisplay();
      return id;
    }
    if(isOperatorPressed()){
      stack.push(id);
      updateStackDisplay();
      state = 1;
      return id;
    }
    if(isEqualPressed()){
      calculate();
      updateStackDisplay();
      state = 0;
      return id;
    }
  }
}

function clear(){
  stack = [];
  state = 0;
  updateStackDisplay();
}

function updateStackDisplay(){ // updateStackDisplay
  display.textContent = "";
  stack.forEach(function(item){display.textContent+=item;});
}

addEventListeners(squares);
