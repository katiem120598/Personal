#ifdef GL_ES
precision mediump float;
#endif

// Default uniforms in 'Book of Shaders' (platform-specific)
uniform vec2 u_resolution;   // screen size in pixels
uniform vec2 u_mouse;		 // mouse location (XY) and click (ZW) in pixels
uniform float u_time;		 // elapsed program time in seconds

// Radius will be constant throughout the shader
const float radius = 100.0;

// Main fragment function
void main() {
    // Center of the screen
    vec2 center = 0.5 * u_resolution;
    
//     // Distance from this pixel to the center
//     float dist = length(gl_FragCoord.xy - center);
	
    // Distance from this pixel to the mouse
    float dist = length(gl_FragCoord.xy - u_mouse.xy);
    
    
    // // The oldschool way
    // float gray = 0.0;
    // if (dist < radius) {
    //     gray = 1.0;
    // }
    
//     // The shader way!
// 	float gray = 1.0 - step(radius, dist);
    
    // The shader way, with 2px of Anti-Aliasing (AA)
    float aaWidth = 2.0;
    float gray = 1.0 - smoothstep(radius - 0.5 * aaWidth, radius + 0.5 * aaWidth, dist);
           
    
    // Set the RGBA color of this pixel
    // by assigning a vec4 value to the built-in `gl_FragColor` variable
    gl_FragColor = vec4(gray, gray, gray, 1.0);
}