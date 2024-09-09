let myShader;

function preload() {
  // myShader = loadShader('../shaders/uniform.vert', '../shaders/glow-city.frag');
  myShader = loadShader('../shaders/uniform.vert', '../shaders/descent-3d.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);

  shader(myShader);
}

function draw() {
  myShader.setUniform('u_resolution', [width, height]);
  myShader.setUniform('u_mouse', [mouseX, height - mouseY]);
  myShader.setUniform('u_time', 0.001 * millis());

  rect(0, 0, width, height);
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}


