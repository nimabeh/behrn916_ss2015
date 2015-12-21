#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;


vec3 hsv(float h, float s, float v){
    vec3 f = vec3(.3,.2,.1 ) * u_time;
    return (abs(fract(h+vec3(3.,2.,1.)/3.+f)*6.-3.)-1.)*.3;
}

void main( void ) 
{
    vec2 uv     = gl_FragCoord.xy;
    uv.x /= u_resolution.x/0.75;
    uv.y /= u_resolution.x /1.5;
    uv.y -= 0.6;
     vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec4 color = texture2D(u_tex0,st);

    
   
    color +=vec4( (hsv(uv.x,1.,1.) - 1. + 2.*uv.y + sin(uv.x*10.) ),1.);
     gl_FragColor = color;
}


// *** help from this resource : http://glslsandbox.com/e#27908.2