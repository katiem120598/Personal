// Our main render shader
let myShader;
let sound, fft, waveform, spectrum;
let jlx;
let osc;
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
let duration = 2.0;
function updateDurationDisplay() {
  document.getElementById("durationDisplay").textContent = duration;
}
updateDurationDisplay();

// Always use `preload` in p5 for any async functions that may take long
// to execute but are needed before program starts.
function preload() {
  myShader = loadShader('/DemoScene/shaders/vshader.vert', 'DemoScene/shaders/fshader.frag');
}

function setup() {
  // Use WEBGL renderer for shaders
  dimx = windowHeight-200;
  dimy = dimx;
  createCanvas(dimx,dimy,WEBGL);
  pixelDensity(1);
  for (let i = 0; i < keys.length; i++) {
    let osc = new p5.Oscillator('sine');
    osc.start();
    osc.amp(0); // Start with amplitude at 0
    oscillators.push(osc);
  }
}

function draw() {
  // Set the active shader
  shader(myShader);
  console.log(activeNotes['1']);
  console.log(width);
  if (activeNotes['1']!=undefined){
    console.log(activeNotes['1'][1]);
  }

  for (let i = 1; i <= 8; i++) {
    myShader.setUniform('act' + i, 0.0);
  }
  // Send whichever information we want to pass to the shader
  // using uniforms
  myShader.setUniform('u_resolution', [width, height]);
  myShader.setUniform('u_mouse', [mouseX, height - mouseY]);
  myShader.setUniform('u_time', 0.001 * millis()); // time in secs
  myShader.setUniform('u_duration',duration);
  Object.keys(activeNotes).forEach(key => {
    if (activeNotes[key] !== undefined) {
      myShader.setUniform('act' + key, 1.0);
      myShader.setUniform('start'+key,(activeNotes[key][1]));
    }
  });

  // Draw a full screen rectangle to apply the shader to
  rect(0, 0, width, height);

  // console.log(`${width}x${height} FPS: ${Math.round(frameRate(), 0)}`);
}

function keyPressed() {
  if (keys.includes(key)) {
    let index = keys.indexOf(key); // Get the index for the corresponding oscillator
    let osc = oscillators[index];
    let frequency = 440 * 2 ** ((midimap[key] - 9) / 12);
    osc.freq(frequency);
    osc.amp(0, 0); // Ensure starting from silence
    osc.amp(0.5, 0.25*duration); // Fade in
    activeNotes[key] = [index,millis()*0.001]; // Track the active note

    osc.amp(0, 0.75*duration); // Fade out over 1.5 seconds

    // Use an immediately-invoked function expression (IIFE) or another form of closure to capture the current state of `key`
    (function(keyCopy) {
      setTimeout(() => {
        delete activeNotes[keyCopy]; // Remove from active notes after fade-out
      }, 0.75*duration*1000); // Corresponds with the fade-out duration
    })(key);
  }

  else if (keyCode === RIGHT_ARROW){
    duration = min(10,duration+0.5)
    updateDurationDisplay();
  }

  else if (keyCode === LEFT_ARROW){
    duration = max(2.0,duration-0.5)
    updateDurationDisplay();
  }
}

/*
function keyReleased() {
  if (keys.includes(key) && activeNotes[key] !== undefined) {
    let osc = oscillators[activeNotes[key]];
    
    // Immediately start fade-out process
    osc.amp(0, 1.5); // Fade out over 1.5 seconds

    // Use an immediately-invoked function expression (IIFE) or another form of closure to capture the current state of `key`
    (function(keyCopy) {
      setTimeout(() => {
        delete activeNotes[keyCopy]; // Remove from active notes after fade-out
      }, 1500); // Corresponds with the fade-out duration
    })(key);
  }
} TESTING
*/