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
      click(event.target.id);
    });
  }
}


//This is a legacy function from my first attempt and I never changed it...oops
function click(id){

  //////////////////////////////////
  //  State 0 //////////////////////
  // Enter Initial number //////////
  //////////////////////////////////
  if(state === 0){
    //Special case: check if subtraction is pressed to toggle +/- numbers
    if(id === "-"){
      
    }

    if(isOperatorPressed(id) && stack.length === 0){
      console.log("You pressed an operator",id);
      return id;
    }
    if(isEqualPressed(id)){
      console.log("You pressed the equal button", id);
      return id;
    }
    if(isNumberPressed(id)){
      console.log("You pressed a number",id);
    }

  }
  //////////////////////////////////
  //  State 1 //////////////////////
  // Define operation //////////////
  //////////////////////////////////
  else if (state === 1){

  }
  //////////////////////////////////
  //  State 2 //////////////////////
  // Set next number ///////////////
  //////////////////////////////////
  else if (state === 2) {
  }
}

//Checks to see if a given item is in aa given array
function isOperatorPressed(id){
  return (id === "+" ||
          id === "-" ||
          id === "*" ||
          id === "/");
}

function isEqualPressed(id){
  return id === "=";
}

function isNumberPressed(id){
  return parseInt(id) ? true : false;
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
