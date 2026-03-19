import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

extend({ ShaderMaterial: THREE.ShaderMaterial });

const fragmentShader = `
uniform float iTime;
uniform vec2 iResolution;

mat2 rot2d(float angle){return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));}
float r(float a, float b){return fract(sin(dot(vec2(a,b),vec2(12.9898,78.233)))*43758.5453);}
float h(float a){return fract(sin(dot(vec2(a, a),vec2(9.9898,78.233)))*43758.5453);}

float noise(vec3 x){
    vec3 p  = floor(x);
    vec3 f  = fract(x);
    f       = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0 + 113.0*p.z;
    return mix(mix(mix( h(n+0.0), h(n+1.0),f.x),
                   mix( h(n+57.0), h(n+58.0),f.x),f.y),
               mix(mix( h(n+113.0), h(n+114.0),f.x),
                   mix( h(n+170.0), h(n+171.0),f.x),f.y),f.z);
}

vec3 dnoise2f(vec2 p){
    float i = floor(p.x), j = floor(p.y);
    float u = p.x-i, v = p.y-j;
    float du = 30.*u*u*(u*(u-2.)+1.);
    float dv = 30.*v*v*(v*(v-2.)+1.);
    u=u*u*u*(u*(u*6.-15.)+10.);
    v=v*v*v*(v*(v*6.-15.)+10.);
    float a = r(i,     j    );
    float b = r(i+1.0, j    );
    float c = r(i,     j+1.0);
    float d = r(i+1.0, j+1.0);
    float k0 = a;
    float k1 = b-a;
    float k2 = c-a;
    float k3 = a-b-c+d;
    return vec3(k0 + k1*u + k2*v + k3*u*v,
                du*(k1 + k3*v),
                dv*(k2 + k3*u));
}

float fbm(vec2 uv){
    vec2 p = uv;
    float f, dx, dz, w = 0.5;
    f = dx = dz = 0.0;
    float slowTime = iTime * 0.15;
    for(int i = 0; i < 24; ++i){
        vec3 n = dnoise2f(uv);
        dx += n.y;
        dz += n.z;
        f += w * n.x / (1.0 + dx*dx + dz*dz);
        w *= 0.85;
        uv *= vec2(1.15);
        uv *= rot2d(1.1 * noise(vec3(p*0.05, slowTime * 0.5)) + 0.5);
    }
    return f;
}

vec3 getGhostlyPalette(float t) {
    vec3 black      = vec3(0.01, 0.0, 0.03);
    vec3 deepPurple = vec3(0.2, 0.0, 0.5);
    vec3 neonPink   = vec3(1.0, 0.2, 0.8);
    vec3 whiteGhost = vec3(1.2, 1.3, 1.7);
    vec3 color = mix(black, deepPurple, smoothstep(0.0, 0.3, t));
    color = mix(color, neonPink, smoothstep(0.25, 0.7, t));
    color = mix(color, whiteGhost, smoothstep(0.6, 1.0, t));
    return color;
}

void main(){
    vec2 uv = 1.0-2.0*(gl_FragCoord.xy / iResolution.xy);
    uv.y /= iResolution.x/iResolution.y;
    float t = iTime * 0.12;
    vec2 rv = uv / (length(uv * 1.5) + 0.1);
    uv *= rot2d(0.15 * t);
    float val = 0.4 * fbm(uv * 1.2 * fbm(length(uv) * 0.5 - t * 0.5 + rv * 0.1));
    uv *= rot2d(-0.25 * t);
    float finalNoise = 0.5 * fbm(uv * val * 5.0 + t) + 0.015 * r(uv.x, uv.y);
    vec3 color = getGhostlyPalette(finalNoise);
    color *= 2.2;
    color = color / (1.0 + color);
    color = smoothstep(0.1, 0.9, color);
    color *= 1.2 - length(uv * 0.8);
    gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    []
  );

  useFrame(({ clock, size }) => {
    uniforms.iTime.value = clock.getElapsedTime();
    uniforms.iResolution.value.set(size.width * window.devicePixelRatio, size.height * window.devicePixelRatio);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        gl={{ antialias: false, alpha: false }}
        camera={{ position: [0, 0, 1] }}
        style={{ width: "100%", height: "100%" }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
      >
        <ShaderPlane />
      </Canvas>
      <span className="fixed bottom-2 right-3 text-[10px] font-mono text-muted-foreground/50 select-none pointer-events-none z-10">
        shader by nostalgic_future
      </span>
    </div>
  );
}
