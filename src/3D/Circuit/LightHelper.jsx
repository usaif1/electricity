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
      // position={[-2, -100, -2.5]}
      position={[2.6,0.7,-2]}
      intensity={1}
      //   angle={Math.PI}
      //   rotation={[Math.PI / 2, 0, 0]}
      decay={1}
    />
  );
}

export default Lights;
