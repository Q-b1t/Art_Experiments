const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate:true,
};

let audio;
let audioContext,audioData, sourceNode, analyserNode;
let manager;

const sketch = () => {
  const numCircles = 5;
  const numSlices = 9;
  const slice = Math.PI * 2 / numSlices;
  const radius = 200;
  const bins = [4,28,44,120]
  
  return ({ context, width, height }) => {
    context.fillStyle = '#EEEAE0';
    context.fillRect(0, 0, width, height);

    //if(!audioContext) return;
    // read frequency data
    //analyserNode.getFloatFrequencyData(audioData);

    context.save();
    context.translate(width/2, height/2);

    for(let i = 0; i < numCircles; i++){
      context.save();
      for(let j = 0; j < numSlices; j++){
        context.rotate(slice);
        context.lineWidth = 10;

        context.beginPath();
        context.arc(0,0,radius + i * 50,0,slice);
        context.stroke();
      }
      context.restore();
    }
    context.restore();

  };
};

const addListener = () => {
  window.addEventListener("mouseup",() => {
    // creatr audio context only if it does not exist
    if(!audioContext)createAudio();
    if(audio.paused){
      audio.play();
      manager.play();
    }
    else{ 
      audio.pause();
      manager.pause();
    }
  });
};

const createAudio = () => {
  audio = document.createElement("audio");
  audio.src = "/audio/OMEGA Instrumental.mp3";
  audio.autoplay = true;

  audioContext = new AudioContext();
  sourceNode = audioContext.createMediaElementSource(audio);
  // connect to the speaker
  sourceNode.connect(audioContext.destination);

  analyserNode = audioContext.createAnalyser();
  analyserNode.fftSize = 1024;
  analyserNode.smoothingTimeConstant = 0.8;
  // connect the source node to the analyser node
  sourceNode.connect(analyserNode);

  // create array to extract audio data. NUmber of data values
  audioData = new Float32Array(analyserNode.frequencyBinCount);

}

const getAverage = (data) => {
  let sum = 0;
  for(let i = 0; i < data.length; i++){
    sum += data[i];
  }
  return sum/data.length;
}


const start = async () => {
  addListener();
  manager = await canvasSketch(sketch, settings);  
  manager.pause();
};


start();