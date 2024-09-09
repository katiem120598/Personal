#ifdef GL_ES
precision mediump float;
#endif

// Define constant values
#define TAU 6.2831853071

// Define uniforms that can be passed to this shader.
// We will use 'book of shaders' naming convention.
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


// Wavy pattern
void main() {
	float gray = 0.5 + 0.5 * max(cos(TAU * gl_FragCoord.x / u_mouse.x), cos(TAU * gl_FragCoord.y / u_mouse.y));
      
    // Set the color of this fragment
    gl_FragColor = vec4(gray, gray, gray, 1.0);
}