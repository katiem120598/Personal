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
    
    // Turn them on/off alternatively
    float gray = mod(pos.x + pos.y, 2.000);
    
    // Add alpha by composing a vec4 using a vec3 and a float
    vec4 pixelColor = vec4(gray, gray, gray, 1.0);
    
    // Set the RGBA color of this pixel
    // by assigning a vec4 value to the built-in `gl_FragColor` variable
    gl_FragColor = pixelColor;
}