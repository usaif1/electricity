import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

import Conductor from "./Conductor";

const index = () => {
  return (
    <div
      style={{
        height: "20rem",
        width: "37rem",
        position: "absolute",
        right: "0",
        border: "1px solid white",
      }}
    >
      <Canvas camera={{ position: [-0.5, 0.4, 1.15] }}>
        <ambientLight />
        <OrbitControls />
        <Suspense fallback={null}>
          <group>
            <Conductor />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default index;
