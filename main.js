//Create event listeners, attach, verify
var squares = document.querySelectorAll(".square");


function addEventListeners(elements){
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click",function(){
      click(event);
    });
  }
}

function click(event){
  console.log("You pressed a button!", event.target.id);
}

addEventListeners(squares);
