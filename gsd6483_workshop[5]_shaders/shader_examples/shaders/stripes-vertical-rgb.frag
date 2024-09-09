// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

// Size will be constant throughout the shader
const float size = 10.0;

void main() {
	// Choose 0.0 or 1.0 values for each channel based on X coord
    float r = floor(mod(      floor(gl_FragCoord.x / size), 3.0) / 2.0);
    float g = floor(mod(1.0 + floor(gl_FragCoord.x / size), 3.0) / 2.0);       
    float b = floor(mod(2.0 + floor(gl_FragCoord.x / size), 3.0) / 2.0);

    // Add alpha by composing a vec4 using a vec3 and a float
    vec4 pixelColor = vec4(r, g, b, 1.0);
    
    // Set the RGBA color of this pixel
    // by assigning a vec4 value to the built-in `gl_FragColor` variable
    gl_FragColor = pixelColor;
}