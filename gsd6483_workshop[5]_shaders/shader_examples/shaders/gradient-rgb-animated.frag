// Translated from the default shader in http://editor.thebookofshaders.com/

#ifdef GL_ES
precision mediump float;
#endif

// Default uniforms in 'Book of Shaders' (platform-specific)
uniform vec2 u_resolution;   // screen size in pixels
uniform vec2 u_mouse;		 // mouse location (XY) and click (ZW) in pixels
uniform float u_time;		 // elapsed program time in seconds

// Main fragment function
void main() {
    // Compute the normalized coordinates of this pixel
    vec2 nCoord = gl_FragCoord.xy/u_resolution.xy;
    
    // Scale the X coordinate 
    nCoord.x *= u_resolution.x/u_resolution.y;
	
    // Define final color using norm coords and 
    // adding a blue color that oscillates over time
    vec4 pixelColor = vec4(nCoord.x, nCoord.y, abs(sin(u_time)), 1.0);

    // Set the RGBA color of this pixel
    // by assigning a vec4 value to the built-in `gl_FragColor` variable
    gl_FragColor = pixelColor;
}