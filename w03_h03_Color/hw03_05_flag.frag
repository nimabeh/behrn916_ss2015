#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
      st -= 0.5;

    float r = length(st);
    float a = atan (st.y, st.x)/3.1415;
    a= a*.5+.5;



    st = vec2(a,r);

    vec3 pct = vec3(st.x);

    pct.r = pow(pct.r+abs(sin(u_time))/2.0,0.7);
    pct.g = pow(pct.r,0.8);
    pct.b = pow(pct.r,2.0);

    vec3 A = vec3  (1.0,0.0,0.0);
    vec3 B = vec3  (0.0,0.0,1.0);
    
    color = mix(A,B,pct);

    color.r += plot(st, pct.r);
    color.g += plot(st, pct.g);
    color.b += plot(st, pct.b);

    gl_FragColor = vec4(color,1.0);
}