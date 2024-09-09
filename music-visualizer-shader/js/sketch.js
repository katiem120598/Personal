// Example adapted from https://p5js.org/reference/#/p5.FFT

let sound, fft, waveform, spectrum;
let myShader;

let jlx;


function preload(){
//  sound = loadSound('assets/samplesound_techno_volume_03.mp3');
  myShader = loadShader('shaders/vshader.vert', 'shaders/fshader-waveform-sampler2d.frag');
}

let osc; // Declare the oscillator

function setup() {
  // Use WEBGL renderer for shaders
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.mouseClicked(togglePlay);

  pixelDensity(1);

  fft = new p5.FFT();
  osc = new p5.Oscillator('saw'); // Initialize the oscillator with a sawtooth wave
}

function draw() {
  // `waveform` is now an array of 1024 values 
  // ranging from -1.0 to 1.0, representing the amplitude
  // of the audio signal at each frequency sample.
  // https://p5js.org/reference/#/p5.FFT/waveform
  waveform = fft.waveform();

  // Alternatively, you can also use the `analyze` method.
  // `spectrum` is now an array of 1024 values
  // ranging from 0 to 255, representing the amplitude
  // of the audio signal at each frequency sample
  // with 127 representing silence.
  // https://p5js.org/reference/#/p5.FFT/analyze
  spectrum = fft.analyze();

  // Set the active shader
  shader(myShader);

  // Send whichever information we want to pass to the shader
  // using uniforms
  myShader.setUniform('u_resolution', [width, height]);
  myShader.setUniform('u_mouse', [mouseX, height - mouseY]);
  myShader.setUniform('u_time', 0.001 * millis()); // time in secs

  // The best way to pass large amounts of data to a shader
  // is by converting the data to a texture. 
  // Here, we convert the waveform and spectrum arrays to
  // p5.Image objects and send them to the shader as textures.
  let waveformAsImg = floatArrayToImage(waveform);
  myShader.setUniform('u_waveform_tex', waveformAsImg);
  
  let spectrumAsImg = byteArrayToImage(spectrum);
  myShader.setUniform('u_spectrum_tex', spectrumAsImg);

  
  // Draw a full screen rectangle to apply the shader to
  rect(0, 0, width, height);
}


function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}


let midimap = {
  '1':0,
  '2':2,
  '3':4,
  '4':5,
  '5':7,
  '6':9,
  '7':11,
  '8':12
}

let keys = Object.keys(midimap);
let activeNotes = {};
let oscillators = [];

function setup() {
  // Assuming you have a setup function where your canvas is created
  for (let i = 0; i < keys.length; i++) {
    let osc = new p5.Oscillator('saw');
    osc.start();
    osc.amp(0); // Start with amplitude at 0
    oscillators.push(osc);
  }
}

function keyPressed() {
  if (keys.includes(key)) {
    let index = keys.indexOf(key); // Get the index for the corresponding oscillator
    let osc = oscillators[index];
    let frequency = 440 * 2 ** ((midimap[key] - 9) / 12);
    osc.freq(frequency);
    osc.amp(0, 0); // Ensure starting from silence
    osc.amp(0.5, 0.5); // Fade in
    activeNotes[key] = index; // Track the active note
  }
}

function keyReleased() {
  if (keys.includes(key) && activeNotes[key] !== undefined) {
    let osc = oscillators[activeNotes[key]];
    osc.amp(0.5,0.5)
    osc.amp(0, 1); // Fade out smoothly
    delete activeNotes[key]; // Remove from active notes
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/**
 * This function takes an array of floating point values
 * between [-1, 1] and returns a p5.Image object where
 * each pixel's color has been mapped from to [0, 255].
 * @param {*} array 
 * @returns 
 */
function floatArrayToImage(array) {
  let img = createImage(array.length, 1);
  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    const val = (0.5 + 0.5 * array[i]) * 255;
    img.pixels[i * 4 + 0] = val;
    img.pixels[i * 4 + 1] = val;
    img.pixels[i * 4 + 2] = val;
    img.pixels[i * 4 + 3] = 255;
  }
  img.updatePixels();
  return img;
}

/**
 * This function takes an array of byte values
 * between [0, 255] and returns a p5.Image object
 * where each pixel's color has been set to the
 * corresponding byte value.
 * @param {*} array 
 * @returns 
 */
function byteArrayToImage(array) {
  let img = createImage(array.length, 1);
  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    const val = array[i];
    img.pixels[i * 4 + 0] = val;
    img.pixels[i * 4 + 1] = val;
    img.pixels[i * 4 + 2] = val;
    img.pixels[i * 4 + 3] = 255;
  }
  img.updatePixels();
  return img;
}