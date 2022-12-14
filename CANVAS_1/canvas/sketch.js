const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require("canvas-sketch-util/math");
const risoColors = require('riso-colors');


const settings = {
  dimensions: [ 2500, 2000 ],
  animate: true,
  fps: 2,
  duration: 30,
  scaleToView: true,
  playbackRate: 'throttle'
};



const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // column number
    const numCols = 4;
    // grid separation
    const colWidth = width / numCols;

    // region margin
    const margin = colWidth * 0.15;

    // possible shapes to draw
    const shapes = ['s','c'];
    
    // number of figures and figures per region
    const totalFigures = 20;
    const coloredFigures = random.range(2,6);
    const figsPerRegion = totalFigures / numCols;

    // array to store the figures
    let figures = [];

    // intialize coordinate x at zero to draw the regions
    let x = 0;
    // select initial color
    let backGroundVar = Math.random() > 0.5 ? false : true;
    // the figure color is always the opposite of the background color
    let figureColor = ''; 

    for(let i = 1; i <= numCols; i++){
      context.save()
      context.lineWidth = 10;
      let backGroundColor = !backGroundVar ? 'white':'black';
      context.fillStyle = backGroundColor;
      context.translate(x,0);
      context.fillRect(0,0,x+colWidth,height);
      figureColor = backGroundColor == 'white' ? 'black':'white';
      for(let j = 0; j < figsPerRegion; j++){
        let agent = new Figure(random.range(margin,colWidth-margin),random.range(margin,height-margin),random.pick(shapes),figureColor);
        agent.draw(context);
        
      }

      x += colWidth;
      backGroundVar = !backGroundVar;
      context.restore();

    }

    // draw colored circles

    for(let i = 0; i < coloredFigures; i ++){
      let agent = new Figure(random.range(margin,width-margin),random.range(margin,height-margin),random.pick(shapes),getColor());
      agent.fill(context);
      figures.push(agent);
    }

    
    // draw cool lines
    const minDist = 600;
    const maxDist = 1200;

    /*
    const lineColor = getColor();
    // first point in the figure
    context.save();
    context.strokeStyle = getColor();
    // put the pen in the first figure 
    context.moveTo(figures[0].pos.x,figures[0].pos.y);
    for(let i = 1; i < figures.length; i++){
      context.lineTo(figures[i].pos.x,figures[i].pos.y);
      context.lineWidth = 12;
    }

    context.closePath();
    context.stroke();

    context.restore();
    */

    
    for(let i = 0; i < figures.length; i++){
      context.strokeStyle = getColor();
      const figure = figures[i];
      for(let j = i+1; j < figures.length; j++){
        const other = figures[j];
        const dist = figure.pos.getDistance(other.pos);
        if(dist > minDist && dist < maxDist){
          context.beginPath();          
          context.lineWidth = math.mapRange(dist,minDist,maxDist,8,20);
          context.moveTo(figure.pos.x,figure.pos.y); // move the pen to the beginning of the line
          context.lineTo(other.pos.x,other.pos.y);
          context.stroke();
        }

      }
    }
    

  };
};


// Vector class
class Vector {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  // gets the distance between this position and other vector
  getDistance(v){
    const dx = this.x - v.x;
    const dy = this.y -v.y;
    return Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
  }
}


class Figure {
  constructor(x,y,figure,color){
    this.pos = new Vector(x,y);
    this.figure = figure;
    this.color = color;
    this.size = random.range(50,100);
  }

  draw(context) {
    // save the context for creating the new figure
    context.save();

    // linewidth and color 
    context.lineWidth = 6;
    context.strokeStyle = this.color;
    // transpate the context origin to the figure's center
    context.translate(this.pos.x,this.pos.y); 

    // begin figure creation
    context.beginPath();

    // draw the figure depending of the object's attribute
    if(this.figure == 'c'){
      context.arc(0,0,this.size,0,Math.PI * 2);
    }else{
      context.rect(-this.size / 2, -this.size / 2, this.size,this.size);
    }
    // draw the contour
    context.stroke();
    // restore the context
    context.restore();
  }

  fill(context){
    // save the context for creating the new figure
    context.save();

    // color 
    context.fillStyle = this.color;
    // transpate the context origin to the figure's center
    context.translate(this.pos.x,this.pos.y); 

    // begin figure creation
    context.beginPath();

    // draw the figure depending of the object's attribute
    if(this.figure == 'c'){
      context.arc(0,0,this.size,0,Math.PI * 2);
      context.fill();
    }else{
      context.fillRect(-this.size / 2, -this.size / 2, this.size,this.size);
    }
    // restore the context
    context.restore();  
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
 color = random.pick(risoColors);
 if(color.name != "Black" && color.name != "White" && color.name != "Gray" ){
  return color.hex; 
 }else{
  return getColor();
 }

}

canvasSketch(sketch, settings);