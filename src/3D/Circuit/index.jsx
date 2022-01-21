import React, { Suspense, useRef, useState } from "react";
import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useGLTF, useAnimations, useHelper } from "@react-three/drei";
import { BlurPass, Resizer, KernelSize } from "postprocessing";

import {
  EffectComposer,
  DepthOfField,
  SelectiveBloom,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

import Circuit from "./Circuit";
import BloomEffect from "./BloomEffect";
import LightHelper from "./LightHelper";
const Index = ({ frameloop }) => {
  const lightRef = useRef(null);
  const change = useRef(true);
  const [color, setColor] = useState(true);

  const lightRef1 = useRef(null);
  const lightRef2 = useRef(null);

  const orbitRef = useRef(null);

  const getMeshRef = (ref) => {
    return ref;
  };

  const hLight = () => {
    return <hemisphereLight position={[0, 0, 0]} intensity={0.1} />;
  };

  return (
    <div
      style={{
        height: "20rem", //actual value
        width: "37rem",
        position: "absolute",
        right: "0",
        top: "25rem",
        border: "1px solid white",
        // height: "100vh", //dev
      }}
    >
      <Canvas camera={{ position: [-1.5, 2, 3], zoom: 2.8 }}>
        <directionalLight intensity={1} position={[0, 0, -2]} />
        <directionalLight intensity={0.2} position={[-1, 0, -1]} />
        <directionalLight intensity={0.25} position={[0, 0, 1]} />
        <ambientLight intensity={0.18} />
        <Suspense fallback={null}>
          <Circuit
            change={change}
            lightRef1={lightRef1}
            lightRef2={lightRef2}
            getMeshRef={getMeshRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Index;
