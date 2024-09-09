#ifdef GL_ES
precision mediump float;
#endif

// Define uniforms that can be passed to this shader.
// We will use 'book of shaders' uniform names.
uniform vec2 u_resolution;
uniform float u_time;

// https://www.shadertoy.com/view/MsS3Wc
// Official HSV to RGB conversion 
vec3 hsv2rgb( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
	return c.z * mix( vec3(1.0), rgb, c.y);
}

// Smooth HSV to RGB conversion 
vec3 hsv2rgb_smooth( in vec3 c )
{
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
	rgb = rgb*rgb*(3.0-2.0*rgb); // cubic smoothing	
	return c.z * mix( vec3(1.0), rgb, c.y);
}

// HUE gradient
void main() {
    float nx = fract(gl_FragCoord.x / u_resolution.x - u_time);

    // vec3 hsv = hsv2rgb(vec3(nx, 1., 1.));
    vec3 hsv = hsv2rgb_smooth(vec3(nx, 1., 1.));

    // Assign a vec4 value to gl_FragColor
    gl_FragColor = vec4(hsv, 1.);
}