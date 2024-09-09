#ifdef GL_ES
precision mediump float;
#endif

// Define uniforms that can be passed to this shader.
// We will use 'book of shaders' uniform names.
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float size = 10.0;

// Horizontal stripes
void main() {
    // // Decide if this pixel should be black or white
    // // based on it's x location.
    // // Remember pixels have coordinates of their centers,
    // // e.g. (0.5, 11.5)
    // float gray = 0.0;
    // if (mod(floor(gl_FragCoord.y / size), 2.0) == 1.0) {
    //     gray = 1.0;
    // }
    
    // Conditionals are not stylish in shaders! 
    // Can we write the above using only arithmetic?
    // float gray = mod(floor(gl_FragCoord.y / size), 2.0);
    float gray = mod(floor(gl_FragCoord.y / u_mouse.y), 2.0);
    
    // Add alpha by composing a vec4 using a vec3 and a float
    gl_FragColor = vec4(gray, gray, gray, 1.0);
}