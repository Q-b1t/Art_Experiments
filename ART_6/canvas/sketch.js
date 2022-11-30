const canvasSketch = require('canvas-sketch');
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const tweakPane = require("tweakpane");

const settings = {
  dimensions: [ 1080, 1080 ],
  animate:true
};

// gui default parameters
const params = {
  cols: 10,
  rows: 10,
  scaleMin:1,
  scaleMax:30,
  freq:0.001,
  amp:0.2,
  frame:0,
  animate:true,
  lineCap: "butt",
};

const sketch = () => {
  return ({ context, width, height, frame}) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    // number of rows and columns
    const cols = params.cols;
    const rows = params.rows;

    // number of cells
    const numCells = cols * rows;

    // the width and height of the overall grid
    const gridw = width * 0.8;
    const gridh = height * 0.8;

    // grid and height of and individual cell
    const cellw = gridw / cols;
    const cellh = gridh / rows;

    /*
    margin surronding the cell
    0.5 because:
    left and right  up and down
    */
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for(let i = 0; i < numCells; i++) {
      // grid cells in x axis
      const col = i % cols; 
      // at every 4 steps increase the value by 1 (y axis)
      const row = Math.floor(i / cols);

      // values of x and y
      const x = col * cellw;
      const y = row * cellh;
      
      // wifth and height of the line
      const w =  cellw * 0.8;
      const h = cellh * 0.8;

      // 2d noise variable [-1:1]
      //const n = random.noise2D(x + frame * 5,y,frequency = params.freq);

      /*
      If the animation is set to true, the frame value of code is used.
      Otherwise, the slidebar's value is used. 
      */
      const f = params.animate ? frame : params.frame;

      const n = random.noise3D(x ,y,f * 5,frequency = params.freq);

      // random angle 
      const angle = n * Math.PI * params.amp;

      // same noise (map [-1:1] to [0:1])
      //const scale = (n+1) / 2 * 30;
      //const scale = (n * 0.5 + 0.5) * 30;
      const scale = math.mapRange(n,-1,1,params.scaleMin,params.scaleMax);

      context.save();
      context.translate(x,y);
      context.translate(margx,margy);
      context.translate(cellw * 0.5, cellh * 0.5);
      // rotate by the random angle
      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(w * -0.5,0);
      context.lineTo(w * 0.5,0);
      context.stroke();

      context.restore();
    }

  };
};

const createPane = () => {
  const pane = new tweakPane.Pane();
  let folder;
  folder = pane.addFolder(
    {
      title:"Grid"
    }
  );
  folder.addInput(params,'lineCap',{options:{butt:'butt',round:'round',square:'square'}})
  folder.addInput(params,'cols',{min:2,max:50,step:1});
  folder.addInput(params,'rows',{min:2,max:50,step:1});
  folder.addInput(params,'scaleMin',{min:1,max:100});
  folder.addInput(params,'scaleMax',{min:1,max:100});

  folder = pane.addFolder({title:"Noise"});
  folder.addInput(params,'freq',{min:-0.01,max:0.01});
  folder.addInput(params,'amp',{min:0,max:1});
  // we do not need an extra parameter for animate
  folder.addInput(params,'frame',{min:0,max:999});
  folder.addInput(params,'animate');


}

createPane();

canvasSketch(sketch, settings);
