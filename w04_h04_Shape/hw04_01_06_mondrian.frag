#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    float pct = 0.0; //percentage

    // square
    // pct = min((step(.2,st.x) - step(.8, st.x)), (step(.2,st.y) - step(.8, st.y)));
    
    // circle
    st = st*2. -1.;
    // pct = 1. - length(abs(st)-.3); //hill
    pct = 1. - length(max(abs(st)-.3,.0));
    // pct = fract(pct*2.);
    // pct = step(.9,pct);

    float final = step(.9,pct)-step(.92,pct);
    float mond = step (.7, pct*2.0) - step (.72, pct*2.0);
    // float shadow = smoothstep(.9,.4,pct)+step(.92,pct);
    final += mond;
    gl_FragColor = vec4(vec3(1.0-final),1.0);
}