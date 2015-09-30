#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

float F(float x, float peak , float width){
    return (smoothstep(peak-width*.5,peak,x)+smoothstep(peak+width*.5, peak,x))-1.0;

}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    // Step will return 0.0 unless the value is over 0.5,
    // in that case it will return 1.0
    float y = step(0.5,st.y);

    vec3 color = vec3(y);

    float pct1 = plot(st,y);
    // color = (1.0-pct1)*color+pct1*vec3(0.0,0.0,1.0);

      vec2 p = vec2(cos(u_time*0.5), sin (u_time*0.5))*.5+.5;
   float pct = F(st.x,p.x, .1);
   pct*= F(st.y, p.y, .1);


  color = vec3(step(.7,pct)+pct) + (1.0-pct1)*color+pct1*vec3(0.0,0.0,0.0);
    
    gl_FragColor = vec4(color,1.0);
}