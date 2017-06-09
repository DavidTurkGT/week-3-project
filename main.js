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
    //Check to see if an operation button is pressed with no first number or holdover number
    if(isIn(event.target.id, ["/","x","+","-"]) &&
        stack === []){
      console.log("You pressed an operation with an empty stack");
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

addEventListeners(squares);
