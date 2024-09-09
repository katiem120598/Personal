
function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
}

function draw() {
  background(255);
  
  loadPixels();
  // Draw a simple 2D gradient
  for (let y = 0; y < height; y++) {  
    for (let x = 0; x < width; x++) {
      // Compute color with an external function
      const rgba = computePixelColor(x, y, width, height);

      const index = 4 * (x + y * width);
      pixels[index + 0] = rgba[0];
      pixels[index + 1] = rgba[1];
      pixels[index + 2] = rgba[2];
      pixels[index + 3] = rgba[3];
    }
  }
  updatePixels();
}


// Define a function to calculate a color based on
// the pixel location and screen size
function computePixelColor(x, y, width, height) {
  const nx = x / width;
  const ny = y / height;
  return [255 * nx, 255 * ny, 0, 255];  // [R, G, B, A]
}