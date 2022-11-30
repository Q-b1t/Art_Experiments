const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};


// declare the text
let text = "Q";
let fontSize = 1200;
let fontFamily = 'sans';

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);



    // text parameters  
    context.fillStyle = 'black';
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseLine = 'top';
    //context.textAlign = 'center';

    // measure text
    const metrics = context.measureText(text);
    //console.log(metrics);
    // extract the text dimentions to get the bounding box
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

    // 
    const x = (width - mw) * 0.5 -mx;
    const y = (height - mh) * 0.5 -my;

    // translate text
    context.save();
    context.translate(x,y);
    context.beginPath();
    context.rect(mx,my,mw,mh);
    context.stroke();
    context.fillText(text,0,0);
    context.restore();


  };
};

canvasSketch(sketch, settings);
