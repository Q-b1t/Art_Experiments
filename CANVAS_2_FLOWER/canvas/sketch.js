const canvasSketch = require('canvas-sketch');
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");


const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);


    
    let petals = new Petals(14,23,'s','green',);
    petals.draw(context,width,height);



  };
};

class Base {
  constructor(num,size,color,startAngle,interval){
    this.num = num;
    this.shape = shape;
    this.color = color;
    this.startAngle = startAngle;
    this.interval = interval;
  }

  draw (context,w,h){}
}

/* 
Avaiable shapes 
1) squares
2) circles (filled)
3) elipse (filled)
*/
class Petals {
  constructor(num,radius,shape,color){
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

    const distance = random.range(50,225);

    for(let i = 0; i < this.num; i ++){
      // angle to rotate 
      const angle = slice * i;

      // center of the petal across a circle trayectory
      x = cx + this.radius * Math.sin(angle);
      y = cy + this.radius * Math.cos(angle);


      // draw figure
      context.save();
      context.translate(x,y);
      context.rotate(-angle);
      context.fillStyle = this.color;
      context.beginPath();
      if(this.shape == 's'){ // square
        context.fillRect(distance, distance,this.radius,this.radius);
      }else if (this.shape == 'e'){
        context.ellipse(distance, distance, this.radius / 2, this.radius, -Math.PI / 5 , 0, 2 * Math.PI);
        context.fill();
      }
      else{ // circle
        context.arc(distance,distance,this.radius,0,Math.PI * 2);
        context.fill();
      }

      context.restore();
    }


  }
}


canvasSketch(sketch, settings);
