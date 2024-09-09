// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif


void main() {
    // Declare RGB color as a three-dimensional vector
	vec3 color = vec3(1.0, 0, 0);
    
    // Vectors can be "swizzled", using permutations of the .xyz notation!
    color = color.zyx;  	// reverse the order of the vector components
    color = color.zzx;  	// duplicate a channel
    
    // Add alpha by composing a vec4 using a vec3 and a float
    vec4 pixelColor = vec4(color, 1.0);
    
    // Set the RGBA color of this pixel
    // by assigning a vec4 value to the built-in `gl_FragColor` variable
    gl_FragColor = pixelColor;
}