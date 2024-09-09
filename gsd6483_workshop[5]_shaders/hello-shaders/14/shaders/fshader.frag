#ifdef GL_ES
precision mediump float;
#endif

// Define uniforms that can be passed to this shader.
// We will use 'book of shaders' naming convention.
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


// Checker pattern
void main() {
	// Calculate the scaled pixel size
    vec2 pos = floor(gl_FragCoord.xy / u_mouse);
    
    // Turn them on/off alternatively
    vec3 gray = vec3(mod(pos.x + pos.y, 2.0));
      
    // Set the color of this fragment
    gl_FragColor = vec4(gray, 1.0);
}