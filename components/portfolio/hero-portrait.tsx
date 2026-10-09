"use client";

import { useEffect, useMemo, useRef, type FC } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import {
  AdditiveBlending,
  MathUtils,
  NoColorSpace,
  PlaneGeometry,
  SRGBColorSpace,
  Vector3,
  type Group,
  type ShaderMaterial,
  type Texture,
} from "three";

// The portrait as a lit, depth-displaced relief: real geometry so it parallaxes
// and catches a moving key light like a dimensional object, not a flat card.
const W = 2.3;
const H = 2.875;
const AMP = 0.42;

const VERT = /* glsl */ `
  uniform sampler2D uDepth;
  uniform float uAmplitude;
  uniform vec2 uPlane;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  varying float vDepth;

  float D(vec2 uv) { return texture2D(uDepth, uv).r; }

  void main() {
    vUv = uv;
    float d = D(uv);
    vDepth = d;

    // Recompute the surface normal from the depth field for real lighting.
    float e = 0.0018;
    float dzdx = (D(uv + vec2(e, 0.0)) - D(uv - vec2(e, 0.0))) / (2.0 * e) * uAmplitude / uPlane.x;
    float dzdy = (D(uv + vec2(0.0, e)) - D(uv - vec2(0.0, e))) / (2.0 * e) * uAmplitude / uPlane.y;
    vec3 n = normalize(vec3(-dzdx, -dzdy, 1.0));

    vec3 pos = position + vec3(0.0, 0.0, d * uAmplitude);
    vec4 world = modelMatrix * vec4(pos, 1.0);
    vWorldPos = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * n);

    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec3 uCamPos;
  uniform vec3 uLightPos;
  uniform vec3 uKeyColor;
  uniform vec3 uAmbient;
  uniform vec3 uRimA;
  uniform vec3 uRimB;
  uniform float uLightIntensity;
  uniform float uReveal;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  varying float vDepth;

  void main() {
    vec3 N = normalize(vNormalW);
    vec3 L = normalize(uLightPos - vWorldPos);
    vec3 V = normalize(uCamPos - vWorldPos);
    vec3 Hh = normalize(L + V);

    float diff = max(dot(N, L), 0.0);
    float spec = pow(max(dot(N, Hh), 0.0), 42.0);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.6);

    vec3 base = texture2D(uMap, vUv).rgb;

    // Depth AO: flat background + valleys fall into shadow so the face lifts off.
    float ao = mix(0.32, 1.0, smoothstep(0.02, 0.6, vDepth));

    vec3 col = base * (uAmbient + uKeyColor * diff * uLightIntensity) * ao;
    col += uKeyColor * spec * uLightIntensity * 0.32;

    // Coral / aqua fresnel rims keyed to the surface orientation.
    float side = smoothstep(-0.25, 0.35, N.x);
    col += uRimA * fres * side * 0.42;
    col += uRimB * fres * (1.0 - side) * 0.42;

    // Cool the shadows toward the site palette.
    col = mix(col, col * vec3(0.86, 0.92, 1.12), 0.22);

    // Feather the rectangle into the void.
    vec2 p = vUv - vec2(0.5, 0.46);
    float r = length(p * vec2(1.02, 0.82));
    float edge = smoothstep(0.5, 0.33, r);

    // Reveal: darken then warm up as the subject "emerges".
    col *= (0.45 + 0.55 * uReveal);
    gl_FragColor = vec4(col, edge * uReveal);
  }
`;

const GLOW_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GLOW_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uReveal;
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5);
    float g = pow(smoothstep(0.5, 0.0, d), 2.3);
    float pulse = 0.82 + 0.18 * sin(uTime * 0.5);
    gl_FragColor = vec4(uColor, g * 0.5 * uReveal * pulse);
  }
`;

interface HeroPortraitProps {
  position?: [number, number, number];
  scale?: number;
}

export const HeroPortrait: FC<HeroPortraitProps> = ({
  position = [-1.15, -0.1, 0],
  scale = 1,
}) => {
  const reduced = useReducedMotion();
  const group = useRef<Group>(null);
  const matRef = useRef<ShaderMaterial>(null);
  const glowMatRef = useRef<ShaderMaterial>(null);

  const [mapSrc, depthSrc] = useTexture([
    "/assets/portrait.webp",
    "/assets/portrait-depth.png",
  ]) as [Texture, Texture];

  // Clone so we can tag colour space without mutating the loader's value.
  const map = useMemo(() => {
    const t = mapSrc.clone();
    t.colorSpace = SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [mapSrc]);
  const depth = useMemo(() => {
    const t = depthSrc.clone();
    t.colorSpace = NoColorSpace;
    t.needsUpdate = true;
    return t;
  }, [depthSrc]);

  const geometry = useMemo(
    () => new PlaneGeometry(W, H, 200, 250),
    []
  );
  const glowGeo = useMemo(() => new PlaneGeometry(W * 1.9, H * 1.5), []);

  const uniforms = useMemo(
    () => ({
      uMap: { value: map },
      uDepth: { value: depth },
      uAmplitude: { value: reduced ? AMP : AMP * 0.35 },
      uPlane: { value: new Vector3(W, H, 0) },
      uCamPos: { value: new Vector3() },
      uLightPos: { value: new Vector3(1.8, 2.2, 3.2) },
      uKeyColor: { value: new Vector3(1.0, 0.98, 0.96) },
      uAmbient: { value: new Vector3(0.26, 0.27, 0.34) },
      uRimA: { value: new Vector3(0.92, 0.28, 0.52) }, // coral
      uRimB: { value: new Vector3(0.2, 0.76, 0.8) }, // aqua
      uLightIntensity: { value: reduced ? 1.0 : 0.35 },
      uReveal: { value: reduced ? 1 : 0 },
    }),
    [map, depth, reduced]
  );

  const glowUniforms = useMemo(
    () => ({
      uColor: { value: new Vector3(0.42, 0.28, 0.9) },
      uReveal: { value: reduced ? 1 : 0 },
      uTime: { value: 0 },
    }),
    [reduced]
  );

  // Damped pointer target for the key light; returns to rest on leave.
  const lightTarget = useRef(new Vector3(1.8, 2.2, 3.2));
  const revealed = useRef(reduced ? 1 : 0);

  useEffect(() => {
    return () => {
      geometry.dispose();
      glowGeo.dispose();
    };
  }, [geometry, glowGeo]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);

    // Cinematic reveal: depth emerges + light warms up.
    if (!reduced && revealed.current < 1) {
      revealed.current = Math.min(1, revealed.current + dt * 0.7);
    }
    const rev = revealed.current;

    if (matRef.current) {
      const u = matRef.current.uniforms;
      u.uReveal.value = rev;
      u.uAmplitude.value = MathUtils.lerp(AMP * 0.35, AMP, rev);
      u.uLightIntensity.value = MathUtils.lerp(0.35, 1.0, rev);
      u.uCamPos.value.copy(state.camera.position);

      // Pointer-driven key light with a slow idle orbit.
      const px = reduced ? 0 : state.pointer.x;
      const py = reduced ? 0 : state.pointer.y;
      const orbit = reduced ? 0 : 1;
      lightTarget.current.set(
        1.6 + px * 1.8 + Math.sin(t * 0.25) * 0.5 * orbit,
        1.9 + py * 1.1 + Math.cos(t * 0.22) * 0.35 * orbit,
        3.2
      );
      u.uLightPos.value.lerp(lightTarget.current, 1 - Math.pow(0.001, dt));
    }

    if (glowMatRef.current) {
      glowMatRef.current.uniforms.uReveal.value = rev;
      glowMatRef.current.uniforms.uTime.value = t;
    }

    // Idle drift: gentle rotation + float, disabled for reduced motion.
    if (group.current) {
      if (reduced) {
        group.current.rotation.set(0, 0, 0);
        group.current.position.set(position[0], position[1], position[2]);
      } else {
        group.current.rotation.y = Math.sin(t * 0.28) * 0.06;
        group.current.rotation.x = Math.sin(t * 0.21) * 0.022;
        group.current.position.set(
          position[0],
          position[1] + Math.sin(t * 0.4) * 0.035,
          position[2]
        );
      }
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Atmospheric glow halo behind the subject. */}
      <mesh geometry={glowGeo} position={[0, 0, -0.7]} renderOrder={0}>
        <shaderMaterial
          ref={glowMatRef}
          vertexShader={GLOW_VERT}
          fragmentShader={GLOW_FRAG}
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* The lit portrait relief. */}
      <mesh geometry={geometry} renderOrder={1}>
        <shaderMaterial
          ref={matRef}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
