#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float geo(vec2 st){

  float d = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Number of sides of your shape
  float N = 3.0;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);
  
  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);

  return smoothstep(.4,.41,d);
}


float stripes(vec2 st) {
    return step(st.y,st.x);
}

vec2 tile(vec2 st) {
    return floor(st);
}
vec2 brick(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x += .5;
    }
    return st;
}

vec2 truchet(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x = 1.-st.x;
    }
    if (mod(st_i.x,2.) == 1.) {
        st.y = 1.-st.y;
    }
    return st;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    
    st = truchet(st*3.);
    // st = brick(st);
    st = truchet(st*1.);
    st = truchet(st*2.);
    
    vec2 st_f = fract(st);
   color.gb= st*cos(u_time);
    float pct = geo(st_f);
    color += 1.0-pct;
    
    
    gl_FragColor = vec4(color,1.0);
}