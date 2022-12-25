const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const colormap = require("colormap");

const settings = {
  dimensions: [ 1080, 1080 ],
  animate:true
};

const sketch = ({width, height}) => {

  const cols = 44;
  const rows = 100;
  const numCells = cols * rows;

  // grid
  const gw = width * 0.8;
  const gh = height * 0.8;

  // cell
  const cw = gw / cols;
  const ch = gh / rows;

  // margin
  const mx = (width - gw) * 0.5;
  const my = (height - gh) * 0.5;

  // array
  const points = [];

  let x, y, n, lineWidth, color;
  let frequency = 0.005;
  let amplitude = 90;

  const colors = colormap({
    colormap:'inferno',
    nshades:amplitude
  });

  for(let i = 0; i < numCells; i++){
    x = (i%cols) * cw;
    y = Math.floor(i/cols) * ch;

    n = random.noise2D(x,y,frequency,amplitude);
    
    x += n;
    y += n;

    lineWidth = math.mapRange(n,-amplitude,amplitude,0,5);
    color = colors[Math.floor(math.mapRange(n,-amplitude,amplitude,0,amplitude))];
    points.push(new Point({x,y,lineWidth,color}));
  }

  return ({ context, width, height}) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(mx,my);
    context.translate(cw/2,ch/2);


    // location to begin the next line segment after an iteration
    let lastX,lastY;

    // draw lines 
    for(let r = 0; r < rows; r++){
      for(let c = 0; c < cols-1; c++){
        const curr = points[r*cols + c];
        const next = points[r*cols + c + 1];

        const mx = curr.x + (next.x - curr.x) * 0.5;
        const my = curr.y + (next.y - curr.y) * 0.5;

        if(!c){
          lastX = curr.x -c / cols * 250;
          lastY = curr.y -r / rows * 250;
        }
        context.beginPath();
        context.strokeStyle = curr.color;
        context.lineWidth = curr.lineWidth;
        context.moveTo(lastX,lastY);
        //if( c == 0) context.moveTo(curr.x,curr.y);
        //else if(c == cols -2) context.quadraticCurveTo(curr.x,curr.y,next.x,next.y);
        context.quadraticCurveTo(curr.x,curr.y,mx,my);
  
        context.stroke();
        lastX = mx;
        lastY = my;


      }
    }


    points.forEach(point => {
      //point.draw(context);
    });
    context.restore();
  };
};

canvasSketch(sketch, settings);

class Point {
  constructor({x,y,lineWidth,color}){
    this.x = x;
    this.y = y;
    this.lineWidth = lineWidth;
    this.color = color;
    this.ix = x;
    this.iy = y;
  }

  draw(context){
    context.save();
    context.translate(this.x,this.y);
    context.fillStyle = "blue";

    context.beginPath();
    context.arc(0,0,10,0,Math.PI*2);
    context.fill();
    context.restore();
  }


}