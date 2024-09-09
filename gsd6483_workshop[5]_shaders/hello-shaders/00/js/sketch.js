
function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
}

function draw() {
  background(255);
  
  loadPixels();
  // Draw a simple 2D gradient
  for (let y = 0; y < height; y++) {  
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const index = 4 * (x + y * width);
      pixels[index + 0] = 255 * nx;
      pixels[index + 1] = 255 * ny;
      pixels[index + 2] = 0;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}
