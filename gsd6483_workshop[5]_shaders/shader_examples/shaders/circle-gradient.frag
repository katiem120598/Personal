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
    
    // Distance from this pixel to the center
    float dist = length(gl_FragCoord.xy - center);
	
//     // Distance from this pixel to the mouse
//     float dist = length(gl_FragCoord.xy - u_mouse.xy);

    // // Linear interpolation:
    // // The oldschool way
    // float gray = 0.0;
    // if (dist < radius) {
    //     gray = 1.0 - dist / radius;
    // }
    
//     // The shader way!
//     float gray = mix(1.0, 0.0, dist / radius);
    
    // Smooth interpolation
    // Using the smoothstep function: https://graphtoy.com/?f1(x,t)=1%20-%20smoothstep(0,%205,%20x)&v1=true&f2(x,t)=&v2=false&f3(x,t)=&v3=false&f4(x,t)=&v4=false&f5(x,t)=&v5=false&f6(x,t)=&v6=false&grid=1&coords=0,0,12
    float gray = 1.0 - smoothstep(0.0, radius, dist);
    
    // See graphs here: https://graphtoy.com/?f1(x,t)=mix(1,0,x/5)&v1=true&f2(x,t)=1-smoothstep(0,5,x)&v2=true&f3(x,t)=&v3=false&f4(x,t)=&v4=false&f5(x,t)=&v5=false&f6(x,t)=&v6=false&grid=1&coords=0,0,12
    
    // Set the RGBA color of this pixel
    // by assigning a vec4 value to the built-in `gl_FragColor` variable
    gl_FragColor = vec4(gray, gray, gray, 1.0);
}