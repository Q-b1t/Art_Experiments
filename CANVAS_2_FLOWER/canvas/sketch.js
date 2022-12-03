const canvasSketch = require('canvas-sketch');
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");


const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
  };
};

// petals class

class Petals {
  constructor(num,shape,color,radius){
    this.num = num;
    this.shape = shape;
    this.color = color;
    this.radius = radius
  }

  draw(context,w,h){
    // center of the flower
    const cx = w * 0.5;
    const cy = h * 0.5;

    // coordinates of the center of the petal
    let x,y; 

    // d/rad
    const slice = math.degToRad(360 / this.num);


    for(let i = 0; i < this.num; i ++){
      // angle to rotate 
      const angle = slice * i;

      // center of the petal across a circle trayectory
      x = cx + this.radius * Math.sin(angle);
      y = cy + this.radius * Math.cos(angle);

      context.save();
      context.translate(x,y);
      context.rotate(-angle);
      context.fillStyle = this.color;
      context.fillRect(x - this.radius / 2, x - this.radius / 2,this.radius,this.radius);
      context.restore();
    }


  }
}


canvasSketch(sketch, settings);
