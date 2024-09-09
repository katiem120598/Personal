// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

// Size will be constant throughout the shader
const float size = 10.0;

void main() {
    // // Decide if this pixel should be black or white
    // // based on it's x location.
    // // Remember pixels have coordinates of their centers,
    // // e.g. (0.5, 11.5)
    // float gray = 0.0;
    // if (mod(floor(gl_FragCoord.x / size), 2.0) == 1.0) {
    //     gray = 1.0;
    // }
    
    // Conditionals are not stylish in shaders! 
    // Can we write the above using only arithmetic?
    float gray = mod(floor(gl_FragCoord.x / size), 2.0);
    
    // Add alpha by composing a vec4 using a vec3 and a float
    vec4 pixelColor = vec4(gray, gray, gray, 1.0);
    
    // Set the RGBA color of this pixel
    // by assigning a vec4 value to the built-in `gl_FragColor` variable
    gl_FragColor = pixelColor;
}