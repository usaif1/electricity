import React, { useState } from "react";
import { DoubleSide, TextureLoader } from "three";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";

//imports
import metalrod from "../assets/metalrod.jpg";

const Conductor = () => {
  return (
    <group
      // rotation={[Math.PI / 1.8, -Math.PI / 10, -Math.PI / 8]}
      rotation={[Math.PI / 2.1, -Math.PI / 10, -Math.PI / 4]}
    >
      <Wire />
      <Electron />
      <Current />
    </group>
  );
};

const Wire = () => {
  const [cylinderDimensions, setCylinderDimensions] = useState([
    0.05,
    0.05,
    3,
    32,
    32,
    true,
  ]);

  const metalRodTexture = useLoader(TextureLoader, metalrod);
  return (
    <mesh>
      <cylinderBufferGeometry args={cylinderDimensions} />
      <meshStandardMaterial
        // map={metalRodTexture}
        color={0xb3b3b3}
        // metalness={1}
        side={DoubleSide}
      />
    </mesh>
  );
};

const Electron = () => {
  const [positionY, setPositionY] = useState(1.45);

  useFrame(({ clock }) => {
    if (positionY > -1.5) setPositionY(positionY - 0.01);
  });

  return (
    <mesh position={[-0.05, positionY, 0.1]}>
      <sphereBufferGeometry args={[0.03, 32, 16]} />
      <meshBasicMaterial color={"blue"} />
    </mesh>
  );
};

const Current = () => {
  const [positionY, setPositionY] = useState(-1.45);

  useFrame(({ clock }) => {
    if (positionY < 1.5) setPositionY(positionY + 0.01);
  });

  return (
    <mesh position={[0.05, positionY, -0.1]}>
      <sphereBufferGeometry args={[0.03, 32, 16]} />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
};

export default Conductor;
