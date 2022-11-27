const canvasSketch = require('canvas-sketch');
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");


const settings = {
  dimensions: [ 1080, 1080 ],
  animate:true
};




const sketch = ({ context, width, height }) => {

  // agents array
  const agents = [];
  const agentsNum = 40;
  for(let i = 0; i < agentsNum; i++){
    const x = random.range(0,width);
    const y = random.range(0,height);
    agents.push(new Agent(x,y));

  }

  return ({ context, width, height }) => {



    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for(let i = 0; i < agents.length; i++){
      const agent = agents[i];
      for(let j = i+1; j < agents.length; j++){
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);
        if(dist > 200) continue;
        context.lineWidth = math.mapRange(dist,0,200,12,1);
        context.beginPath();
        context.moveTo(agent.pos.x,agent.pos.y); // move the pen to the beginning of the line
        context.lineTo(other.pos.x,other.pos.y);
        context.stroke();
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width,height);
    });
    
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
// agent class: this creates the context and draws the Vector
class Agent{
  constructor(x,y){
    this.pos = new Vector(x,y);
    this.vel = new Vector(random.range(-1,1),random.range(-1,1));
    this.radius = random.range(4,12);
  }

  // bouce back whenever they reach the end of the canvas
  bounce(width,height) {
    if(this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if(this.pos.y <= 0 || this.pos.y >= width) this.vel.y *= -1;

  }

  // adds the velocity to the position vector
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  

  // draws the current agent´s position
  draw(context) {
    //context.fillStyle = "black";
    context.lineWidth = 4;
    context.save(); // save the context
    context.translate(this.pos.x,this.pos.y); // translate the reference to the agentś coordinates

    context.beginPath();
    context.arc(0,0,this.radius,0,Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore(); // restore the context
  }
}

canvasSketch(sketch, settings);
