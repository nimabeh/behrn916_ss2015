#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  vec3 color4= vec3(0.0);
  float w = u_resolution.x;
float h = u_resolution.y;
  float d = 0.0;

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Number of sides of your shape
  int N = 6;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI/2.0;
  float r = TWO_PI/float(N);
  
  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);

  color = vec3(step(.4,d)- step(0.45,d));

float move = (w / 10.0) * (cos(u_time));
    vec2 pos  = vec2(w * 0.5, h * 0.5);

    
    float dist  = length(gl_FragCoord.xy - pos) + 60.0*cos(u_time);
    
    float size = 300.0;
    
    float color2 = 0.0;

    color2 += pow(size / dist, 2.0);
    float color3 = mix(color2, color2+0.5, 0.5);
    color4 = vec3(color3 / 2.0+cos(u_time), color3 / 4.0+cos(u_time), color3 / 1.5+cos(u_time));

  gl_FragColor = vec4(mix(color,color4,u_time),1.0);
}