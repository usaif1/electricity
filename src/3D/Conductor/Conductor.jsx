import React, { useState, useRef } from "react";
import { DoubleSide, TextureLoader } from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

//imports
import metalrod from "../../assets/metalrod.jpg";

const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Conductor = () => {
  return (
    <>
      <group position={[0.2, 0, 0]} rotation={[0, -Math.PI / 12, Math.PI / 2]}>
        <Wire />
        {count.map((number) => {
          return (
            <React.Fragment key={number}>
              <Electron number={number} />
              <Current number={number} />
            </React.Fragment>
          );
        })}
      </group>
      <Text
        scale={[1.3, 1.3, 1.3]}
        color={"white"}
        position={[0, 0.21, -0.1]}
        rotation={[0, -Math.PI / 12, 0]}
      >
        &lt;-- Current
      </Text>
      <Text
        scale={[1.3, 1.3, 1.3]}
        color={"white"}
        position={[0, -0.2, 0.1]}
        rotation={[0, -Math.PI / 12, 0]}
      >
        Electrons --&gt;
      </Text>
    </>
  );
};

const Wire = () => {
  const [cylinderDimensions, setCylinderDimensions] = useState([
    0.05,
    0.05,
    3,
    32,
    32,
    false,
  ]);

  const metalRodTexture = useLoader(TextureLoader, metalrod);
  return (
    <mesh>
      <cylinderBufferGeometry args={cylinderDimensions} />
      <meshStandardMaterial color={0x97999c} side={DoubleSide} />
    </mesh>
  );
};

const Electron = ({ number }) => {
  const [positionY, setPositionY] = useState(-1.7);

  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current.position.y > -1.6) {
      const y = positionY.toFixed(2);
      const newPosition = parseFloat(y) - 0.01;
      setPositionY(parseFloat(newPosition));
    }

    if (ref.current.position.y < -1.52) {
      const y = 1.5 - number * 0.3;
      setPositionY(y);
    }
  });

  return (
    <mesh
      position={[-0.05, parseFloat((positionY + number * 0.3).toFixed(2)), 0.1]}
      ref={ref}
    >
      <sphereBufferGeometry args={[0.03, 32, 16]} />
      <meshBasicMaterial color={0x0d56df} />
    </mesh>
  );
};

const Current = ({ number }) => {
  const [positionY, setPositionY] = useState(-1.7);

  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (positionY < 1.6) {
      const y = positionY.toFixed(2);
      const newPosition = parseFloat(y) + 0.01;
      setPositionY(parseFloat(newPosition.toFixed(2)));
    }
    if (ref.current.position.y > 1.52) {
      const y = -(1.5 + number * 0.3);
      setPositionY(y);
    }
  });

  return (
    <mesh
      position={[0.05, parseFloat((positionY + number * 0.3).toFixed(2)), -0.1]}
      ref={ref}
    >
      <sphereBufferGeometry args={[0.03, 32, 16]} />
      <meshBasicMaterial color={"#F13232"} />
    </mesh>
  );
};

export default Conductor;
