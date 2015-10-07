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
    float left = step(0.1, st.x) ;
    float bottom = step (0.3, st.y);

    // top-right 
    float right = step(0.1, 1.0-st.x);
    float top = step (0.3, 1.0-st.y);

    float pct = left*bottom*right*top;

    color = vec3(pct,1.0, 0.5);

    gl_FragColor = vec4(color,1.0);
}