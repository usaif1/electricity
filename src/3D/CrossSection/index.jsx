import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

import CrossSection from "./CrossSection";

const Index = ({ frameloop }) => {
  const canvasRef = useRef(null);
  const animate = useRef(true);

  return (
    <div
      style={{
        height: "20rem", //actual value
        width: "37rem",
        position: "absolute",
        right: "0",
        top: "25rem",
        border: "1px solid white",
      }}
    >
      <Canvas
        camera={{ position: [-1.5, 1, 1.5], zoom: 8 }}
        frameloop={frameloop}
        ref={canvasRef}
      >
        <ambientLight intensity={0.1} />
        <OrbitControls />
        <Suspense fallback={null}>
          <group position={[0, 0.03, 0]}>
            <CrossSection animate={animate} />
          </group>
        </Suspense>
      </Canvas>
      <button
        onClick={() => {
          animate.current = !animate.current;
        }}
      >
        click me
      </button>
    </div>
  );
};

export default Index;
