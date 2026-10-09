"use client";

import { Suspense, useRef, type FC } from "react";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { HeroPortrait } from "@/components/portfolio/hero-portrait";
import { Loader } from "@/components/portfolio/loader";
import { useSceneActive } from "@/hooks/use-scene-active";

// Gentle pointer-parallax camera (frame-rate independent damping).
// To restore the astronaut: swap <HeroPortrait/> for <Astronaut/> from
// "@/components/portfolio/astronaut" (originals kept in components/portfolio
// and backed up under /backup).
const Rig: FC = () => {
  useFrame((state: RootState, delta: number) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 8, 1 + state.mouse.y / 8, 3],
      0.4,
      delta
    );
  });
  return null;
};

export const HeroScene: FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const frame = useRef<HTMLElement>(null);
  const active = useSceneActive({ whenVisible: frame });

  return (
    <figure
      ref={frame}
      className="absolute inset-0"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas
        camera={{ position: [0, 1, 3] }}
        dpr={[1, 2]}
        frameloop={active ? "always" : "never"}
      >
        <Suspense fallback={<Loader />}>
          <HeroPortrait
            position={isMobile ? [0, 0.15, 0] : [-1.15, -0.1, 0]}
            scale={isMobile ? 0.68 : 1}
          />
          <Rig />
        </Suspense>
      </Canvas>
    </figure>
  );
};
