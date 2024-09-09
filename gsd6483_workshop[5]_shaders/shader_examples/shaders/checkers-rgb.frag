// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

// Size will be constant throughout the shader
const float size = 10.0;

void main() {
	// Calculate the scaled pixel size
    vec2 pos = floor(gl_FragCoord.xy / size);
    
    // Choose 0.0 or 1.0 values for each channel based on XY coord
    float r = floor(mod(      pos.x + pos.y, 3.0) / 2.0);
    float g = floor(mod(1.0 + pos.x + pos.y, 3.0) / 2.0);       
    float b = floor(mod(2.0 + pos.x + pos.y, 3.0) / 2.0);
    
    // Add alpha by composing a vec4 using a vec3 and a float
    vec4 pixelColor = vec4(r, g, b, 1.0);
    
    // Set the RGBA color of this pixel
    // by assigning a vec4 value to the built-in `gl_FragColor` variable
    gl_FragColor = pixelColor;
}