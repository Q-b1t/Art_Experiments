// we want to select an element from the document (canvas)
let canvas = document.querySelector("canvas");
// this is where we draw
let context = canvas.getContext("2d");
// change property
context.fillStyle = "blue";
// coordinates on a 2d space (where to begin drawing)
context.fillRect(100,100,400,400);

context.lineWidth=4;

// in this part we start a new shape
context.beginPath();
context.rect(100,100,400,400);
context.stroke();

// start a new path to draw a circle:
context.beginPath();
context.strokeStyle = "white";
context.arc(300,300,100,0,Math.PI * 2);
// this function is to draw the figure after the parameters have been set it is only the contour
context.stroke();

