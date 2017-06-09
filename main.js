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
    // //Press the clear button
    // if(event.target.id === "C"){
    //   stack = [];
    //   updateDisplay();
    //   return event;
    // }
    //Check to see if an operation button is pressed with no first number or holdover number
    if(isIn(event.target.id, ["/","x","+","-","="])){
      //Pressing an operation with something on the stack pushes the operation on the stack and moves to state 1
      if (stack.length) {
        //Special case: the stack is just ["-"], do nothing
        if(stack[stack.length -1] === "-"){
          if(event.target.id === "-"){
            stack.pop()
            updateDisplay();
          }
          return event;
        }
        stack.push(event.target.id);
        updateDisplay();
        state = 1;
        return event;
      }
      else{
        //Empty Stack
        if(event.target.id === "-"){
          stack.push(event.target.id);
          updateDisplay();
        }
        return event;
      }
    }
    else {
      //Updates the stack
      //If a number is already there then it pops and concats the next digit and pushes onto the stack
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
function isIn(item, array){
  var inside = false;
  array.forEach(function(e){if(item===e){inside=true;}});
  return inside;
}

function updateDisplay(){
  display.textContent = "";
  stack.forEach(function(item){display.textContent+=item;});
}

function clear(){
  stack = [];
  state = 0;
  updateDisplay();
}

function calculate(){
  console.log("Ready to calculate!");
  console.log("NOTE: at this time calculate will only work with three items");
  var num1 = parseFloat(stack[0]);
  var num2 = parseFloat(stack[2]);
  var ans;
  if(stack[1] === "+"){
    ans = num1 + num2;
    stack = [];
    stack.push(ans);
    updateDisplay();
  }
  else if (stack[1] === "-") {
    ans = num1 - num2;
    stack = [];
    stack.push(ans);
    updateDisplay();
  }
  else if (stack[1] === "x") {
    ans = num1*num2;
    stack = [];
    stack.push(ans);
    updateDisplay();
  }
  else if (stack[1] === "/") {
    ans = num1/num2;
    stack = [];
    stack.push(ans);
    updateDisplay();
  }
  else {
    console.log("Wat!");
  }
}

addEventListeners(squares);
