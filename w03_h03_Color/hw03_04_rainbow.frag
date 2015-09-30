#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;


vec3 hsv(in float h, in float s, in float v){
    vec3 f = vec3(.3,.2,.1 ) * u_time;
    return (abs(fract(h+vec3(3.,2.,1.)/3.+f)*6.-3.)-1.)*.3;
}

void main( void ) 
{
    vec2 uv     = gl_FragCoord.xy;
    uv.x /= u_resolution.x;
    uv.y /= u_resolution.x /9.0;
    uv.y -= 4.;
    
    gl_FragColor = vec4( (hsv(uv.x,1.,1.) - 1. + 2.*uv.y + sin(uv.x*10.) ),1.);
}


// *** help from this resource : http://glslsandbox.com/e#27908.2