//Create event listeners, attach, verify
var squares = document.querySelectorAll(".square");
var display = document.querySelector("#output");

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
      click(event);
    });
  }
}

function click(event){
  if(state === 0){
    console.log("You are in state 0!");
    //Press the clear button
    if(event.target.id === "C"){
      console.log("You pressed clear.  Doing someting later.");
      return event;
    }
    //Check to see if an operation button is pressed with no first number or holdover number
    if(isIn(event.target.id, ["/","x","+","-","="])){
      //Pressing an operation with something on the stack moves to state 1
      if (stack.length) {
        stack.push(event.target.id);
        updateDisplay();
        state = 1;
        return event;
      }
      else{
        console.log("Do Nothing");
        return event;
      }
    }
    else {
      console.log("Adding " + event.target.id + " to number and upadating display");
      if(stack.length){
        stack.push(stack.pop() + event.target.id);
      }
      else {
        stack.push(event.target.id);
      }
      updateDisplay();
      return event;
    }
  }
  else if (state === 1){
    console.log("You are in state 1!");
  }
  else if (state === 2) {
    console.log("You are in state 2!");
  }
  else {
    console.log("You are in state 3!");
  }

}

//Checks to see if a gievn item is in aa given array
function isIn(item, array){
  var inside = false;
  array.forEach(function(e){if(item===e){inside=true;}});
  return inside;
}

function updateDisplay(){
  display.textContent = "";
  stack.forEach(function(item){display.textContent+=item;});
}

addEventListeners(squares);
