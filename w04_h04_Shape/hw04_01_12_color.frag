
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    vec2 color = vec2(circle(st,abs(sin(u_time))));

    gl_FragColor = vec4( 1.0,1.0-color, 1.0 );
}