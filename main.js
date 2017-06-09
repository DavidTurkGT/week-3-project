//Create event listeners, attach, verify
var squares = document.querySelectorAll(".square");
var display = document.querySelector("#output");
var calc = false;

var stack = [];
var number = "";
var operator = "";
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
      click(event);
    });
  }
}


//This is a legacy function from my first attempt and I never changed it...oops
function click(event){

  //////////////////////////////////
  //  State 0 //////////////////////
  // Enter Initial number //////////
  //////////////////////////////////
  if(state === 0){
    //Press equal do nothing
    if(event.target.id === "="){
      return event;
    }
    //Press an operator and the stack is not empty
    if(isIn(event.target.id,["+","x","/"])){
      console.log("Operator other than sub");
      if(stack.length){
        console.log("You pressed a button and there is a number displayed");
        console.log("Moving to State 1");
        calc = false;
        state = 2;
        stack.push(event.target.id);
        updateDisplay();
        return event;
      }
      return event;
    }
    //Press subtraction with an empty stack
    if(event.target.id === "-"){
      console.log("Sub!");
      if(stack[0] === "-"){
        console.log("foo");
        stack.pop();
        updateDisplay();
      }
      else{
        console.log("bar");
        state = stack.length ? 1 : 0
        stack.push("-");
        updateDisplay();
      }
      return event;
    }
    //Press a number
    if(calc){ stack = []; }
    stack.push(event.target.id);
    updateDisplay();
    return event;
  }
  //////////////////////////////////
  //  State 1 //////////////////////
  // Define operation //////////////
  //////////////////////////////////
  else if (state === 1){
    //Check to see if = is pressed for a special case
    //If there are at least three things on the stack then we can perform a calculation (We have at least two inputs and an operation)
    //If the stack is an odd length this is valid
    //If the stack is even then we have an operation with no second input
    if(event.target.id === "=" &&
        stack.length >= 3 &&
        stack.length % 2 === 1){
        calculate();
        return event;
    }
    //With the special case of = filtered out, we do nothing on a press of =
    if(event.target.id === "="){
      console.log("Do nothing!");
      return event;
    }
    if(isIn(event.target.id, ["/","x","+","-"])){
      //If a user presses an operator before a # then they can change the operation
      stack.pop();
      stack.push(event.target.id);
      updateDisplay();
      return event;
    }
    else{
      //The user has pressed a number
      //Push the number on the stack and update the display, then move to state 2
      stack.push(event.target.id);
      updateDisplay();
      state = 2;
      return event;
    }
  }
  //////////////////////////////////
  //  State 2 //////////////////////
  // Set next number ///////////////
  //////////////////////////////////
  else if (state === 2) {
    //If the user presses the clear button clear the stack and update the display
    //If the user presses = and the last item on the stack is an operator then do nothing otherwise, calculate!
    if(event.target.id === "="){
      if(isIn(stack[stack.length-1],["+","-","x","/"])){
        console.log("Do nothing!");
        return event;
      }
      else {
        calculate();
        state = 0;
        return event;
      }
    }
    //If the user presses an operator, push the operator onto the stack, update the display and move to state 1
    if(isIn(event.target.id, ["/","x","+","-"])){
      stack.push(event.target.id);
      updateDisplay();
      state = 1;
      return event;
    }
    //If the user presses a number then pop the last number off the stack and concat with the input then push back on the stack.
    //Update the display
    stack.push(stack.pop() + event.target.id);
    updateDisplay();
    return event;
  }

}

//Checks to see if a given item is in aa given array
function isIn(item, array){ // is
  var inside = false;
  array.forEach(function(e){if(item===e){inside=true;}});
  return inside;
}

function updateDisplay(){ // updateStackDisplay
  display.textContent = "";
  stack.forEach(function(item){display.textContent+=item;});
}

function clear(){
  stack = [];
  state = 0;
  updateDisplay();
}

function calculate(){ // calculate
  calc = true;
  console.log("Stack when calulate() was called: ",stack);
  console.log("---------------");
  if(stack.length > 3){
    while(stack.length > 3){
    //Find all cases of multiplication or division
    console.log("Looking for multiplication or division");
    console.log("---------------");
    for(var i = 0; i < stack.length; i++){
      if(stack[i+1] === "/"){
        console.log("Division found.  Dividing...");
        var calcArray = stack.splice(i,3);
        console.log("The calcArray is: ",calcArray);
        console.log("The stack is: ",stack);
        var ans = "" +subCalc(calcArray);
        console.log("The answer is: ",ans);
        console.log("---------------");
        console.log("Inserting the answer back in the stack...");
        stack.splice(i,0,ans);
        console.log("The stack is: ",stack);
        console.log("---------------");
      }
      if(stack[i+1] === "x"){
        console.log("multiplication found. Multiplying...");
        var calcArray = stack.splice(i,3);
        console.log("The calcArray is: ",calcArray);
        console.log("The stack is: ",stack);
        var ans = "" +subCalc(calcArray);
        console.log("The answer is: ",ans);
        console.log("---------------");
        console.log("Inserting the answer back in the stack...");
        stack.splice(i,0,ans);
        console.log("The stack is: ",stack);
        console.log("---------------");
      }
    }
    //Find all cases of Addition or subtraction
    for(var i =0; i < stack.length; i++){
      if(stack[i+1] === "+"){
        console.log("Addition found. Adding...");
        var calcArray = stack.splice(i,3);
        console.log("The calcArray is: ",calcArray);
        console.log("The stack is: ",stack);
        var ans = "" +subCalc(calcArray);
        console.log("The answer is: ",ans);
        console.log("---------------");
        console.log("Inserting the answer back in the stack...");
        stack.splice(i,0,ans);
        console.log("The stack is: ",stack);
        console.log("---------------");
      }
      if(stack[i+1] === "-"){
        console.log("Subtraction found.  Subtracting...");
        var calcArray = stack.splice(i,3);
        console.log("The calcArray is: ",calcArray);
        console.log("The stack is: ",stack);
        var ans = "" +subCalc(calcArray);
        console.log("The answer is: ",ans);
        console.log("---------------");
        console.log("Inserting the answer back in the stack...");
        stack.splice(i,0,ans);
        console.log("The stack is: ",stack);
        console.log("---------------");
      }
    }
  }
  }
  else{
    var ans = subCalc(stack);
    stack = [];
    stack.push(ans);
    updateDisplay();
  }
  console.log("Outside the while loop");
  updateDisplay();
}

function subCalc(array){ //
  let num1 = parseFloat(array[0]);
  let num2 = parseFloat(array[2]);
  if(array[1] === "+"){
    return num1+num2;
  }
  if (array[1] === "-") {
    return num1-num2;
  }
  if (array[1] === "x") {
    return num1*num2;
  }
  if (array[1] === "/") {
    return num1/num2;
  }
}

addEventListeners(squares);
