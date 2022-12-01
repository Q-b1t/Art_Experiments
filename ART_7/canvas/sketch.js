const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

// declare the text
let text = "Q";
let fontSize = 1200;
let fontFamily = 'Courier New';

// we need to create another grid
const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {

  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  fontSize = cols;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);



    // text parameters  
    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseLine = 'top';
    //context.textAlign = 'center';

    // measure text
    const metrics = typeContext.measureText(text);
    //console.log(metrics);
    // extract the text dimentions to get the bounding box
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

    // 
    const tx = (cols - mw) * 0.5 -mx;
    const ty = (rows - mh) * 0.5 -my;

    // translate text
    typeContext.save();
    typeContext.translate(tx,ty);
    typeContext.beginPath();
    typeContext.rect(mx,my,mw,mh);
    typeContext.stroke();
    typeContext.fillText(text,0,0);
    typeContext.restore();

    // get rba channels in the data key
    const typeData = typeContext.getImageData(0,0,cols,rows).data;
    
    context.drawImage(typeCanvas,0,0);

    for(let i = 0; i < numCells; i++){
      const col = i % cols;
      const row = Math.floor(i/cols);
      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      context.fillStyle = `rgb(${r},${g},${b})`

      context.save();
      context.translate(x,y);
      context.translate(cell * 0.5, cell * 0.5);
      //context.fillRect(0,0,cell,cell);
      context.beginPath();
      context.arc(0,0,cell * 0.5,0,Math.PI * 2);
      context.fill();
      context.restore();

    }

  };
};

// instead of drawing in context we will draw into typeContext
const onKeyUp = (e) => {
  console.log(e);
}
// listens on the event then the key is released
document.addEventListener('keyup',onKeyUp);

canvasSketch(sketch, settings);