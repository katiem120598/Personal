PShader shader;

void setup() {
  size(640, 360, P2D);
  noStroke();

  shader = loadShader("../../shaders/circle-ripples.frag");
}

void draw() {
  shader.set("u_resolution", float(width), float(height));
  shader.set("u_mouse", float(mouseX), height - float(mouseY));
  shader.set("u_time", 0.001 * millis());
  shader(shader);
  rect(0,0,width,height);
}
