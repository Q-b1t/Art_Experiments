const canvasSketch = require('canvas-sketch');
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");


const settings = {
  dimensions: [ 1200, 1200 ],
  animate: true,
  fps: 5,
  duration: 25,
  scaleToView: true,
  playbackRate: 'throttle'
};



const sketch = () => {


  // flower petals
  let base1 = new Base(4,800,'orange',math.degToRad(0),'s',true);
  let base2 = new Base(4,766,'purple',math.degToRad(0),'s',true);
  let base3 = new Base(4,733,'white',math.degToRad(45),'s',false);
  let base4 = new Base(4,700,'red',math.degToRad(45),'s',false);

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    base1.spin(math.degToRad(1));
    base1.draw(context,width,height);

    base2.spin(math.degToRad(1));
    base2.draw(context,width,height);

    base3.spin(math.degToRad(2));
    base3.draw(context,width,height);

    base4.spin(math.degToRad(2));
    base4.draw(context,width,height);
    
  };
};

class Base {
  constructor(num,size,color,startAngle,shape,clockwise){
    this.num = num; // num of figures
    this.color = color; // color
    this.startAngle = startAngle; // starting angle
    this.size = size; // size of the figure
    this.shape = shape; // s or e
    this.clockwise = clockwise;
  }

  draw (context,w,h){
    // center of the flower
    const cx = w * 0.5;
    const cy = h * 0.5;
    // interval of rate of change in angle
    const slice = math.degToRad(180 / this.num);
    
    // define spinning direction
    const spinFactor = this.clockwise ? 1 : -1; 


    for(let i = 0; i < this.num; i++){
      const angle = slice * i;
      
      // save actual context
      context.save();

      // initial conditions
      context.translate(cx,cy);
      context.rotate(this.startAngle * spinFactor);
      context.fillStyle = this.color;

      context.rotate(angle * spinFactor);
      
      // draw depending on shape
      if(this.shape == 's'){
        context.fillRect(-this.size / 2,-this.size / 2,this.size,this.size);
      }else{
        context.beginPath();
        context.ellipse(0, 0, this.size / 8, this.size, -Math.PI / 5 , 0, 2 * Math.PI);
        context.fill();
      }
      context.restore();

    }


  
  }

  spin(angle){
    this.startAngle += angle;
  }

}


/*
      if(this.shape == 's'){
        context.fillRect(-this.size / 2,-this.size / 2,this.size,this.size);

      }
      else{
        context.ellipse(0, 0, this.size / 8, this.size, -Math.PI / 5 , 0, 2 * Math.PI);
        context.fill();  
      }
*/



















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
