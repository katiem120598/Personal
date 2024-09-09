#ifdef GL_ES
precision mediump float;
#endif

// Default uniforms in 'Book of Shaders' (platform-specific)
uniform vec2 u_resolution;   // screen size in pixels
uniform vec2 u_mouse;		 // mouse location (XY) and click (ZW) in pixels
uniform float u_time;		 // elapsed program time in seconds


// Main fragment function
void main() {
    // Center of the screen
    vec2 center = 0.5 * u_resolution;
    
//     // Distance from this pixel to the center
//     float dist = length(gl_FragCoord.xy - center);
	
    // Distance from this pixel to the mouse
    float dist = length(gl_FragCoord.xy - u_mouse.xy);
	
    // Compute gray value based on a modulated sin wave
    float gray = 0.5 * (sin(0.2 * dist - u_time) + 1.0);
    
    // See graphs here: https://graphtoy.com/?f1(x,t)=mix(1,0,x/5)&v1=true&f2(x,t)=1-smoothstep(0,5,x)&v2=true&f3(x,t)=&v3=false&f4(x,t)=&v4=false&f5(x,t)=&v5=false&f6(x,t)=&v6=false&grid=1&coords=0,0,12
    
    // Set the RGBA color of this pixel
    // by assigning a vec4 value to the built-in `gl_FragColor` variable
    gl_FragColor = vec4(gray, gray, gray, 1.0);
}