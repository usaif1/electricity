import { useGLTF, useAnimations, useHelper } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function Lights() {
  const light = useRef();
  //   useHelper(light, THREE.PointLightHelper, 0.5, "cyan");
  return (
    <pointLight
      ref={light}
      color={"green"}
      position={[2.6, 0.8, -2]}
      intensity={4}
      decay={2}
      distance={3.8}
    />
  );
}

export default Lights;
