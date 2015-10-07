#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    // bottom-left
    vec2 bl = smoothstep(vec2(0.2),st,st-0.0001); 
    float pct = bl.x * bl.y;

    // top-right 
    vec2 tr = smoothstep(vec2(0.2),st, 0.9-st);
    pct *= (tr.x-0.1) * (tr.y-0.1);
    
    color = vec3(pct);

    gl_FragColor = vec4(color,abs(sin(u_time)));
}