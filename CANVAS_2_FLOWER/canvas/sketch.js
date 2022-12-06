const canvasSketch = require('canvas-sketch');
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");


const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
  fps: 1,
  duration: 20,
  scaleToView: true,
  playbackRate: 'throttle'
};



const sketch = () => {
  let base = new Base(2,700,'red',math.degToRad(30),'s');

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);


    
    base.spin(math.degToRad(10));
    base.draw(context,width,height);
    
  };
};

class Base {
  constructor(num,size,color,startAngle,shape){
    this.num = num; // num of figures
    //this.shape = shape; // shape (square or elipse)
    this.color = color; // color
    this.startAngle = startAngle; // starting angle
    this.size = size; // size of the figure
    this.shape = shape; // s or e
  }

  draw (context,w,h){
    // center of the flower
    const cx = w * 0.5;
    const cy = h * 0.5;
    // interval of rate of change in angle
    const slice = math.degToRad(360 / this.num);
    console.log("slice",math.radToDeg(slice));
    
    // save actual context
    context.save();

    // initial conditions
    context.translate(cx,cy);
    context.rotate(-this.startAngle);
    context.fillStyle = this.color;

    // draw the circles 
    for(let i = 1; i <= this.num; i ++){
      if(this.shape == 's'){
        context.fillRect(-this.size / 2,-this.size / 2,this.size,this.size);

      }
      else{
        context.ellipse(0, 0, this.size / 8, this.size, -Math.PI / 5 , 0, 2 * Math.PI);
        context.fill();  
      }
  

      // rotate for new figure
      const angle =  this.startAngle * i;
      console.log("angle",math.radToDeg(angle));
      context.rotate(-angle);
    }
    // restore context
    context.restore();
  
  }

  spin(angle){
    this.startAngle += angle;
  }

}





















/* 
Avaiable shapes 
1) squares
2) circles (filled)
3) elipse (filled)
*/
class Petals {
  constructor(num,radius,shape,color,startAngle){
    this.num = num;
    this.shape = shape;
    this.color = color;
    this.radius = radius;
    this.startAngle = startAngle;

  }

  draw(context,w,h){
    // center of the flower
    const cx = w * 0.5;
    const cy = h * 0.5;

    // coordinates of the center of the petal
    let x,y; 

    const slice = math.degToRad(360 / this.num);
    
    const distance = random.range(50,225);


    for(let i = 0; i < this.num; i ++){
      // angle to rotate 
      const angle = slice * i + this.startAngle;


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

  spin(angle){
    this.startAngle += angle;
  }

}


canvasSketch(sketch, settings);
