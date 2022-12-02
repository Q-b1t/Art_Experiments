const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

// declare the text
let text = "A";
let fontSize = 1200;
let fontFamily = 'serif';

// we need to create another grid
const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {

  const cell = 21;
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
    
    context.fillStyle = 'black';

    context.fillRect(0,0,width,height);

    context.textBaseLine = "middle";
    context.textAlign = "center";

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

      const glyph = getGlyph(r); // get the glypg based on  the brightness

      context.font = `${cell * 2}, ${g}, ${b}`;
      if(Math.random() < 0.1) context.font = `${cell * 10}, ${g}, ${b}`;

      context.fillStyle = `rgb(${r},${g},${b})`

      context.save();
      context.translate(x,y);
      context.translate(cell * 0.5, cell * 0.5);
      //context.fillRect(0,0,cell,cell);
      context.beginPath();
      context.fillText(glyph,0,0);
      context.restore();

    }

  };
};

// get a random string based on channel 
const getGlyph = (v) => {
  if(v < 50) return '';
  if(v < 100) return '.';
  if(v < 150) return '-';
  if(v < 200) return '+';
  const arr = ["mariana","q","xd","quantum"];
  return random.pick(arr);
}

// instead of drawing in context we will draw into typeContext
const onKeyUp = (e) => {
  console.log(e);
}
// listens on the event then the key is released
document.addEventListener('keyup',onKeyUp);

canvasSketch(sketch, settings);