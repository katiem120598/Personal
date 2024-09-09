
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
}

function draw() {
  background(255);
  
  loadPixels();
  // Draw a simple 2D gradient
  for (let y = 0; y < height; y++) {  
    for (let x = 0; x < width; x++) {
      // Compute color with an external function
      const rgba = computePixelColor2(x, y, width, height, mouseX, mouseY, frameCount, 100);

      const index = 4 * (x + y * width);
      pixels[index + 0] = rgba[0];
      pixels[index + 1] = rgba[1];
      pixels[index + 2] = rgba[2];
      pixels[index + 3] = rgba[3];
    }
  }
  updatePixels();

  textSize(24);
  text(`${width}x${height} FPS: ${Math.round(frameRate(), 0)}`, 10, 24);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


// Define a function to calculate a color based on
// the pixel location and screen size
function computePixelColor(x, y, width, height) {
  const nx = x / width;
  const ny = y / height;
  return [255 * nx, 255 * ny, 0, 255];  // [R, G, B, A]
}

// Define a function to calculate a color based on
// the pixel location and custom additional parameters
function computePixelColor2(x, y, width, height, mouseX, mouseY, frame, waveLength) {
  const dx = mouseX - x;
  const dy = mouseY - y;
  const d = Math.sqrt(dx * dx + dy * dy);

  const r = 255 * 0.5 * (Math.sin(2 * Math.PI * d / waveLength - 0.1 * frame) + 1);
  const g = 255 * 0.5 * (Math.sin(2 * Math.PI * d / waveLength + 0.09 * frame) + 1);
  const b = 255 * 0.5 * (Math.sin(2 * Math.PI * d / waveLength + 0.11 * frame) + 1);

  return [r, g, b, 255];  // [R, G, B, A]
}