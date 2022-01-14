import React, { useState, useRef } from "react";
import { DoubleSide, TextureLoader } from "three";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";

//imports
import metalrod from "../assets/metalrod.jpg";

const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Conductor = () => {
  return (
    <group
      // rotation={[Math.PI / 1.8, -Math.PI / 10, -Math.PI / 8]}
      rotation={[Math.PI / 2.1, -Math.PI / 10, -Math.PI / 2.5]}
    >
      <Wire />
      {count.map((number) => {
        return (
          <>
            <Electron number={number} />
            <Current number={number} />
          </>
        );
      })}
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
      <meshStandardMaterial color={0xb3b3b3} side={DoubleSide} />
    </mesh>
  );
};

const Electron = ({ number }) => {
  const [positionY, setPositionY] = useState(-1.7);

  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current.position.y > -1.6) {
      setPositionY(positionY - 0.01);
    }

    if (ref.current.position.y < -1.52) {
      const y = 1.5 - number * 0.3;
      setPositionY(y);
    }
  });

  return (
    <mesh position={[-0.05, positionY + number * 0.3, 0.1]} ref={ref}>
      <sphereBufferGeometry args={[0.03, 32, 16]} />
      <meshBasicMaterial color={"blue"} />
    </mesh>
  );
};

const Current = ({ number }) => {
  const [positionY, setPositionY] = useState(-1.7);

  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (positionY < 1.6) {
      setPositionY(positionY + 0.01);
    }
    if (ref.current.position.y > 1.52) {
      const y = -(1.5 + number * 0.3);
      setPositionY(y);
    }
  });

  return (
    <mesh position={[0.05, positionY + number * 0.3, -0.1]} ref={ref}>
      <sphereBufferGeometry args={[0.03, 32, 16]} />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
};

export default Conductor;
