const canvasSketch = require('canvas-sketch');
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const colorUtil = require("canvas-sketch-util/color");
const risoColors = require('riso-colors');

console.log(risoColors);


const seed = Date.now();

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = ({ context, width, height }) => {
  random.setSeed(seed);
  let x,y,w,h,fill,stroke,blend;

  const num = 100;
  const degrees = -30;
  const colorNum = 5;

  const colors = [];
  const rects = [];

   // random colors
  for(let i = 0; i < colorNum; i++){
    colors.push(random.pick(risoColors));
  }

  // random skewed rectangle parameters
  for(let i = 0; i < num; i++){
    x = random.range(0,width);
    y = random.range(0,height);
    w = random.range(200,400);
    h = random.range(40,200); 
    blend = random.value() > 0.5 ? "overlay":"source-over";
    fill = random.pick(colors).hex;
    stroke = random.pick(colors).hex;
    rects.push({x,y,w,h,fill,stroke,blend});
  }

  const bgColor = random.pick(risoColors).hex;
  let shadowColor;

  const mask = {
    radius: width * 0.4,
    sides : 3,
    x : width * 0.5,
    y : height * 0.58
  };

  // draw them all 
  return ({ context, width, height }) => {
      context.fillStyle = bgColor;
      context.fillRect(0, 0, width, height);


      context.save();
      context.translate(mask.x, mask.y);
      drawPolygon({context,radious :mask.radius,sides:mask.sides});



      context.clip();




      rects.forEach(rect => {
        const {x,y,w,h,fill,stroke,blend} = rect;
        context.save();
        context.translate(-mask.x,-mask.y);
        context.translate(x,y);
        context.strokeStyle = stroke;
        context.fillStyle = fill;
        context.lineWidth = 10;
  

        context.globalCompositeOperation = blend;



        //

        drawSkewedRect({context,w,h,degrees});

        // shadow
        shadowColor = colorUtil.offsetHSL(fill,0,0,-20);
        shadowColor.rgba[3] = 0.5
        context.shadowColor = colorUtil.style(shadowColor.rgba);
        context.shadowOffsetX = -10;
        context.shadowOffsetY = 20;

        context.fill();
        context.shadowColor = null;
        context.stroke();

        context.globalCompositeOperation = "source-over";


        context.lineWidth = 2;
        context.strokeStyle = "black";
        context.stroke();

        context.restore();


      });

      context.restore();

      context.save();
      context.translate(mask.x,mask.y);
      context.lineWidth = 20;
      drawPolygon({context,radious :mask.radius - context.lineWidth,sides:mask.sides});
      context.globalCompositeOperation = "color-burn";
      context.strokeStyle = random.pick(risoColors).hex;
      context.stroke();

      context.restore();

    
  };
};

canvasSketch(sketch, settings);

const drawSkewedRect = ({context,w = 600,h = 200, degrees = -45}) => {
  const angle = math.degToRad(degrees);
  const rx = Math.cos(angle) * w;
  const ry = Math.sin(angle) * w;

  context.save();
  context.translate(-rx / 2,-1*(ry + h)/2)

  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(rx,ry);
  context.lineTo(rx,ry+h);
  context.lineTo(0,h);
  context.closePath();
  context.stroke(),
  context.restore();


}

const drawPolygon = ({context,radious = 100, sides = 3}) => {
  const slice = Math.PI * 2 / sides;
  context.beginPath();
  context.moveTo(0,-radious);

  for(let i = 1; i < sides; i++){
    const theta = i * slice - Math.PI * 0.5;
    context.lineTo(Math.cos(theta) * radious, Math.sin(theta)* radious);
  }
  context.closePath();
}