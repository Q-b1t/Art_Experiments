const canvasSketch = require('canvas-sketch');
const { degToRad } = require('canvas-sketch-util/math');
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");


const settings = {
  dimensions: [ 1550, 1550 ],
  animate: true,
  fps: 3,
  duration: 20,
  scaleToView: true,
  playbackRate: 'throttle'
};



const sketch = () => {

  // colors
  let colors = {
    "leaves1":"rgb(102,204,0)",
    "leaves2":"rgb(0,153,0)",
    "leavesContour1":getColor(),
    "leavesContour2":getColor(),
    "base1":"rgb(255,128,0)",
    "base2":"rgb(127,0,255)",
    "petals1":getColor(),
    "petals2":getColor(),
    "petals3":"black",


  };

  // flower petals (external)
  let base1 = new Base(4,800,colors["base1"],math.degToRad(0),'s',true);
  let base2 = new Base(4,766,colors["base2"],math.degToRad(0),'s',true);
  let base3 = new Base(4,733,'white',math.degToRad(45),'s',false);
  let base4 = new Base(4,700,'red',math.degToRad(45),'s',false);

  // flower petals (internal)
  let petal1 = new Petals(8,50,'c',colors["petals1"],math.degToRad(50),250,false);
  let petal2 = new Petals(8,50,'s',colors["petals2"],math.degToRad(50),225,false);
  let petal3 = new Petals(8,60,'c',colors["petals3"],math.degToRad(51),245,false);


  // leaves:
  // ACTUAL LEAVES
  let leaves1 = new Petals(6,100,'e',colors["leaves1"],math.degToRad(0),440,false);
  let leaves2 = new Base(4,750,colors["leaves2"],math.degToRad(45),'e',true);
  // LEAVES CONTOUR 1
  let leavesCont1 = new Petals(6,120,'e',colors["leavesContour1"],math.degToRad(1),440,false);
  // LEAVES CONTOUR 3
  let leavesCont2 = new Base(4,800,colors["leavesContour2"],math.degToRad(45),'e',true);

  return ({ context, width, height }) => {

    
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
  
    // animate leaves
    leavesCont1.spin(math.degToRad(10),getColor());
    leavesCont1.draw(context,width,height);

    leaves1.spin(math.degToRad(10));
    leaves1.draw(context,width,height);
  
    leavesCont2.spin(math.degToRad(10),getColor());
    leavesCont2.draw(context,width,height);

    leaves2.spin(math.degToRad(10));
    leaves2.draw(context,width,height);


    
    // animate external flower petals
    
    base1.spin(math.degToRad(1));
    base1.draw(context,width,height);

    base2.spin(math.degToRad(1));
    base2.draw(context,width,height);

    base3.spin(math.degToRad(2));
    base3.draw(context,width,height);

    base4.spin(math.degToRad(2));
    base4.draw(context,width,height);

    // animate interla flower petals

    petal3.spin(math.degToRad(2));
    petal3.draw(context,width,height);

    petal1.spin(math.degToRad(2),getColor());
    petal1.draw(context,width,height);

    petal2.spin(math.degToRad(2),getColor());
    petal2.draw(context,width,height);

    
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

  spin(angle,color = '-'){
    this.startAngle += angle;
    if(color != '-'){
      this.color = color;
    }
  }

}


/* 
Avaiable shapes 
1) squares
2) circles (filled)
3) elipse (filled)
*/
class Petals {
  constructor(num,radius,shape,color,startAngle,distance,clockwise){
    this.num = num;
    this.shape = shape;
    this.color = color;
    this.radius = radius;
    this.startAngle = startAngle;
    this.distance = distance;
    this.clockwise = clockwise;

  }

  draw(context,w,h){
    // center of the flower
    const cx = w * 0.5;
    const cy = h * 0.5;

    // coordinates of the center of the petal
    let x,y; 

    const slice = math.degToRad(360 / this.num);
    
    //const distance = random.range(50,225);

    // define spinning direction
    const spinFactor = this.clockwise ? 1 : -1; 

    for(let i = 0; i < this.num; i ++){
      // angle to rotate 
      const angle = slice * i + this.startAngle;


      // center of the petal across a circle trayectory
      x = cx + this.radius * Math.sin(angle);
      y = cy + this.radius * Math.cos(angle);


      // draw figure
      context.save();
      context.translate(x,y);
      context.rotate(angle * spinFactor);
      context.fillStyle = this.color;
      context.beginPath();
      if(this.shape == 's'){ // square
        context.fillRect(this.distance, this.distance,this.radius,this.radius);
      }else if (this.shape == 'e'){
        context.ellipse(this.distance, this.distance, this.radius / 2, this.radius, -Math.PI / 5 , 0, 2 * Math.PI);
        context.fill();
      }
      else{ // circle
        context.arc(this.distance,this.distance,this.radius,0,Math.PI * 2);
        context.fill();
      }

      context.restore();
    }


  }

  spin(angle,color = '-'){
    this.startAngle += angle;
    if(color != '-'){
      this.color = color;
    }
  }

}

// get a random RGB COLOR
let getColor = () =>{
  let r,g,b;
  let fillColor = 'red';
  r = random.range(0,255);
  g = random.range(0,255);
  b = random.range(0,255);
  fillColor = `rgb(${r},${g},${b})`;
  return fillColor;
}



canvasSketch(sketch, settings);