import React, { useRef, useMemo } from "react";
import { DoubleSide } from "three";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { nanoid } from "nanoid";

let count = [
  { x: 0.02, z: 0 },
  { x: -0.03, z: 0.01 },
  { x: 0.005, z: -0.02 },
  { x: -0.018, z: -0.015 },
  { x: 0, z: 0.03 },
];

const CrossSection = ({ animate }) => {
  const charges = useMemo(() => { // so the particles don't get re rendered when animate changes
    let arr = [];
    for (let c of count)
      for (let i = 0.06; i < 2; i += 0.1)
        arr.push({ x: c.x, y: i, z: c.z, id: Math.random() + 1, index: i });
    return arr;
  }, []);

  return (
    <group position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <directionalLight intensity={2} color={"#D8DB00"} position={[0, 1, 0]} />
      <directionalLight intensity={2} color={"#D8DB00"} position={[0, -1, 0]} />
      <directionalLight
        intensity={0.4}
        color={"#F0F0EF"}
        position={[-1, 0, 0]}
      />
      <directionalLight
        intensity={0.4}
        color={"#F0F0EF"}
        position={[1, 0, 0]}
      />

      <hemisphereLight position={[0, 0, 0]} color={"#AFAFAF"} intensity={0.1} />
      <Wire />
      <group position={[0, -0.65, 0]}>
        {charges.map(({ id, ...props }) => {
          return <Charge key={id} {...props} animate={animate} />;
        })}
      </group>
    </group>
  );
};

const Wire = () => {
  const cylinderDimensions = [
    0.05,
    0.05,
    0.5,
    32,
    32,
    false,
    Math.PI / 2,
    Math.PI * 1.5,
  ];

  return (
    <mesh>
      <cylinderBufferGeometry args={cylinderDimensions} />
      <meshStandardMaterial color={"#899091"} side={DoubleSide} />
    </mesh>
  );
};

const Charge = ({ x, y, z, animate }) => {
  const ref = useRef(null);

  useFrame((state) => {
    if (animate.current) {
      if (ref.current.position.y > -1) {
        ref.current.position.y -= 0.0025;
      }

      if (ref.current.position.y < -0.6) {
        ref.current.position.y = 1.3;
      }
    }
  });

  return (
    <React.Fragment>
      <mesh position={[x, y, z]} ref={ref}>
        <sphereBufferGeometry args={[0.0055, 32, 16]} />
        <meshStandardMaterial color={"#2EB6FF"} />
      </mesh>
    </React.Fragment>
  );
};

export default CrossSection;
