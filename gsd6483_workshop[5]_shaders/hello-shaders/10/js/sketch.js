// Adapted from https://p5js.org/examples/3d-basic-shader.html

// Our main render shader
let myShader;

// Always use `preload` in p5 for any async functions that may take long
// to execute but are needed before program starts.
function preload() {
  myShader = loadShader('shaders/vshader.vert', 'shaders/fshader.frag');
}

function setup() {
  // Use WEBGL renderer for shaders
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
}

function draw() {
  // Set the active shader
  shader(myShader);

  // Draw a full screen rectangle to apply the shader to
  rect(0, 0, width, height);

  // console.log(`${width}x${height} FPS: ${Math.round(frameRate(), 0)}`);
}