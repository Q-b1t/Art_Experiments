const canvasSketch = require('canvas-sketch');
const { degToRad } = require('canvas-sketch-util/math');
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const risoColors = require('riso-colors');


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
    "leaves1":risoColors[77].hex,
    "leaves2":risoColors[34].hex,
    "leavesContour1":getColor(),
    "leavesContour2":getColor(),
    "base1":risoColors[60].hex,
    "base2":risoColors[46].hex,
    "base3": "white",
    "base4": risoColors[5].hex,
    "petals1":getColor(),
    "petals2":getColor(),
    "petals3":"black",
    "squares1":getColor(),
    "squaresContour1":"black",
    "circles1":getColor(),
    "circlessContour1":"black",
    "leavesInner1":risoColors[59].hex,
    "leavesInner2":risoColors[21].hex,
    "leavesInnerC1":"black",
    "leavesInnerC2":"black",

  };

  console.log(risoColors.length);

  // flower petals (external)
  let base1 = new Base(4,800,colors["base1"],math.degToRad(0),'s',true);
  let base2 = new Base(4,766,colors["base2"],math.degToRad(0),'s',true);
  let base3 = new Base(4,733,colors["base3"],math.degToRad(45),'s',false);
  let base4 = new Base(4,700,colors["base4"],math.degToRad(45),'s',false);

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

  // internal squares
  let squares1 = new Petals(12,30,'s',colors["squares1"],math.degToRad(49),175,false);
  let squaresC1 = new Petals(12,40,'s',colors["squaresContour1"],math.degToRad(50),164,false);

  let circlesC1 = new Petals(12,30,'c',colors["circlessContour1"],math.degToRad(49),125,false);
  let circles1 = new Petals(12,25,'c',colors["circles1"],math.degToRad(48),128,false);

  // inner leafs
  let leavesInnerContour1 = new Base(2,380,colors["leavesInnerC1"],math.degToRad(0),'e',true);
  let leavesInner1 = new Base(2,350,colors["leavesInner1"],math.degToRad(0),'e',true);
  let leavesInnerContour2 = new Base(2,320,colors["leavesInnerC2"],math.degToRad(0),'e',true);
  let leavesInner2 = new Base(2,300,colors["leavesInner2"],math.degToRad(0),'e',true);

    // center
    let center = new Center(5,150);

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

    // interal random stuff
    circles(context,width,height,320,'black');
    circles(context,width,height,315,getColor());
    circles(context,width,height,260,'black');

    squaresC1.spin(math.degToRad(15));
    squaresC1.draw(context,width,height);

    squares1.spin(math.degToRad(15),getColor());
    squares1.draw(context,width,height);
    
    circles(context,width,height,255,getColor());
    circles(context,width,height,240,'black');
    circles(context,width,height,235,getColor());

    circlesC1.spin(math.degToRad(25));
    circlesC1.draw(context,width,height);

    circles1.spin(math.degToRad(25),getColor());
    circles1.draw(context,width,height);

    leavesInnerContour1.spin(math.degToRad(15));
    leavesInnerContour1.draw(context,width,height);

    leavesInner1.spin(math.degToRad(15));
    leavesInner1.draw(context,width,height);

    leavesInnerContour2.spin(math.degToRad(15));
    leavesInnerContour2.draw(context,width,height);

    leavesInner2.spin(math.degToRad(15));
    leavesInner2.draw(context,width,height);


    circles(context,width,height,160,'black');
    circles(context,width,height,155,getColor());
    circles(context,width,height,130,'black');
    circles(context,width,height,125,getColor());
    circles(context,width,height,100,'black');

    circlesMany(context,width,height);

    center.draw(context,width,height);


  };
};

let circlesMany = (context,width,height,count = 100) => {
  let black = false;
  let color = "black"
  while(count > 10){
    color = black ? "black":getColor();
    circles(context,width,height,count,color);
    count = black ? count -2 : count -10;
    black = !black;

  }
}


class Center{
  constructor(num,maxDistance){
    this.num = num;
    this.maxDistance = maxDistance;
  }
  draw(context,w,h){
    // center of the flower
    const cx = w * 0.5;
    const cy = h * 0.5;
    // draw
    context.save()
    context.translate(cx,cy);
    context.lineWidth = 3;
    context.strokeStyle = "black";
    
    for(let i = 0; i < this.num; i++){
      let size = random.range(20,this.maxDistance);
      context.rotate(math.degToRad(random.range(0,90)));
      context.rect(-size / 2,-size / 2,size,size);  
      context.stroke();
    }

    context.restore();
  }
}

let circles = (context,w,h,radius,color) => {
  // center of the flower
  const cx = w * 0.5;
  const cy = h * 0.5;

  // draw circle
  context.save();
  context.beginPath();
  context.fillStyle = color;
  context.translate(cx,cy);
  context.arc(0,0,radius,0,Math.PI * 2);
  context.fill();
  context.restore();
}



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
  /*
  let r,g,b;
  let fillColor = 'red';
  r = random.range(0,255);
  g = random.range(0,255);
  b = random.range(0,255);
  fillColor = `rgb(${r},${g},${b})`;
  return fillColor;
  */
 return random.pick(risoColors).hex;
}



canvasSketch(sketch, settings);