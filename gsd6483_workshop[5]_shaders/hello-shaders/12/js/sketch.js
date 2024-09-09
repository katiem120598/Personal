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

  // Send whichever information we want to pass to the shader
  // using uniforms
  myShader.setUniform('u_resolution', [width, height]);
  myShader.setUniform('u_time', 0.001 * millis());  // time in secs

  // Draw a full screen rectangle to apply the shader to
  rect(0, 0, width, height);

  // console.log(`${width}x${height} FPS: ${Math.round(frameRate(), 0)}`);
}