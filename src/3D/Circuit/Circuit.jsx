import * as THREE from "three";
import React, { useRef, useMemo, useEffect, useState } from "react";
import { DoubleSide } from "three";
import { useLoader, useFrame, useThree, useStore } from "@react-three/fiber";
import { nanoid } from "nanoid";
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

import Circuit from "../../Circuit";
import LightHelper from "./LightHelper";

const CircuitDiag = ({ lightRef1, lightRef2 }) => {
  const groupRef = useRef(null);
  const handleRef = useRef(null);

  const bulbRef = useRef(null);
  const batteryRef = useRef(null);
  const lightRef3 = useRef(null);
  const planeRef = useRef(null);
  const cathodeRef = useRef(null);
  const anodeRef = useRef(null);
  const chargeRef = useRef(null);

  const hLightRef = useRef(null);

  // useHelper(hLightRef, THREE.SpotLightHelper, "cyan");

  const [color, setColor] = useState(true);

  const { scene, nodes, materials, animations } = useGLTF("/circuit.glb");
  const { actions } = useAnimations(animations, groupRef);

  const [number, setNumber] = useState(14);

  const balls = [
    <mesh
      ref={chargeRef}
      name="Sphere001"
      geometry={nodes.Sphere001.geometry}
      material={nodes.Sphere001.material}
      position={[3.35, 0, 0]}
      rotation={[0, -1.56, 0]}
      scale={[0.8, 0.8, 0.8]}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere003"
      geometry={nodes.Sphere003.geometry}
      material={nodes.Sphere003.material}
      position={[2.51, 0, 0]}
      rotation={[0, -1.57, 0]}
      scale={[0.8, 0.8, 0.8]}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere004"
      geometry={nodes.Sphere004.geometry}
      material={nodes.Sphere004.material}
      position={[1.66, 0, 0]}
      rotation={[0, -1.57, 0]}
      scale={[0.8, 0.8, 0.8]}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere005"
      geometry={nodes.Sphere005.geometry}
      material={nodes.Sphere005.material}
      position={[0.82, 0, 0]}
      rotation={[Math.PI, -1.57, Math.PI]}
      scale={[0.8, 0.8, 0.8]}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere006"
      geometry={nodes.Sphere006.geometry}
      material={nodes.Sphere006.material}
      position={[0.01, 0, -0.08]}
      rotation={[Math.PI, -0.15, Math.PI]}
      scale={0.8}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere007"
      geometry={nodes.Sphere007.geometry}
      material={nodes.Sphere007.material}
      position={[0, 0, -0.92]}
      rotation={[Math.PI, 0, Math.PI]}
      scale={0.8}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere008"
      geometry={nodes.Sphere008.geometry}
      material={nodes.Sphere008.material}
      position={[0, 0, -1.77]}
      rotation={[-Math.PI, 0.01, -Math.PI]}
      scale={[0.8, 0.8, 0.8]}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere009"
      geometry={nodes.Sphere009.geometry}
      material={nodes.Sphere009.material}
      position={[0.65, 0, -2]}
      rotation={[-Math.PI, 1.57, -Math.PI]}
      scale={[0.8, 0.8, 0.8]}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere010"
      geometry={nodes.Sphere010.geometry}
      material={nodes.Sphere010.material}
      position={[1.49, 0, -2]}
      rotation={[0, Math.PI / 2, 0]}
      scale={0.8}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere011"
      geometry={nodes.Sphere011.geometry}
      material={nodes.Sphere011.material}
      position={[2.34, 0, -2]}
      rotation={[0, Math.PI / 2, 0]}
      scale={[0.8, 0.8, 0.8]}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere012"
      geometry={nodes.Sphere012.geometry}
      material={nodes.Sphere012.material}
      position={[3.18, 0, -2]}
      rotation={[0, 1.57, 0]}
      scale={[0.8, 0.8, 0.8]}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere013"
      geometry={nodes.Sphere013.geometry}
      material={nodes.Sphere013.material}
      position={[3.99, 0, -1.89]}
      rotation={[0, 0.28, 0]}
      scale={[0.8, 0.8, 0.8]}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere014"
      geometry={nodes.Sphere014.geometry}
      material={nodes.Sphere014.material}
      position={[4.01, 0, -1.04]}
      scale={[0.8, 0.8, 0.8]}
    />,
    <mesh
      ref={chargeRef}
      name="Sphere015"
      geometry={nodes.Sphere015.geometry}
      material={nodes.Sphere015.material}
      position={[4, 0, -0.29]}
      rotation={[0, -0.04, 0]}
      scale={[0.8, 0.8, 0.8]}
    />,
  ];

  let renderBalls = useMemo(() => {
    return balls.slice(0, number);
  }, [number]);

  useEffect(() => {
    if (actions) {
      const actionsArr = Object.keys(actions);
      for (let i = 0; i < balls.length; i++) {
        actions[actionsArr[i]].enabled = true;
        actions[actionsArr[i]].play();
      }
    }
  }, []);

  return (
    <>
      <group position={[-1.3, -0.45, 0]}>
        <mesh
          geometry={nodes.Plane.geometry}
          material={materials["Material.014"]}
          ref={planeRef}
        />
        <group
          position={[0, 0, -0.95]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
          scale={[1, 1.18, 1.22]}
          ref={batteryRef}
        >
          <mesh
            ref={cathodeRef}
            geometry={nodes.Cylinder002_1.geometry}
            material={
              new THREE.MeshStandardMaterial({
                color: "#9B8301",
                metalness: 0.2,
                roughness: 0,
              })
            }
          />
          <hemisphereLight
            position={[0, 0, 0]}
            intensity={0.1}
            ref={hLightRef}
          />

          <mesh
            ref={anodeRef}
            geometry={nodes.Cylinder002_2.geometry}
            material={
              new THREE.MeshLambertMaterial({
                color: "#ABABAB",
              })
            }
          />
          <mesh
            ref={anodeRef}
            geometry={nodes.Cylinder002_3.geometry}
            material={new THREE.MeshStandardMaterial({ color: "#2C2C2C" })}
          />
        </group>
        <mesh
          geometry={nodes.Sphere002.geometry}
          material={
            !color
              ? new THREE.MeshStandardMaterial({
                  color: "grey",
                })
              : new THREE.MeshPhongMaterial({
                  color: "#2FFF00",
                  emissive: "#177801",
                  emissiveIntensity: 0.2,
                  shininess: 100,
                })
          }
          position={[2.6, 0.22, -2]}
          scale={0.15}
          ref={bulbRef}
        />
        {color ? <LightHelper /> : null}
        <mesh
          geometry={nodes.Cylinder002.geometry}
          material={
            new THREE.MeshStandardMaterial({
              color: "#E4E3E0",
              metalness: 0.4,
              roughness: 0,
            })
          }
          position={[2.52, 0.12, -2]}
          scale={[0.43, 0.13, 0.43]}
        />
        <mesh
          geometry={nodes.Cylinder003.geometry}
          material={
            new THREE.MeshStandardMaterial({
              color: "#E4E3E0",
              metalness: 0.4,
              roughness: 0,
            })
          }
          position={[2.68, 0.12, -2]}
          scale={[0.43, 0.13, 0.43]}
        />
        <group ref={groupRef}>
          {renderBalls.map((mesh, index) => {
            return mesh;
          })}
        </group>
        <group>
          <mesh
            geometry={nodes.Sphere.geometry}
            material={nodes.Sphere.material}
            position={[1.84, 0, 0]}
            scale={[0.04, 0.04, 0.04]}
            onClick={() => {
              const actionsArr = Object.keys(actions);
              if (handleRef.current.rotation.z !== 0) {
                for (let i = 0; i < number; i++) {
                  actions[actionsArr[i]].paused = true;
                }
                setColor(!color);
                handleRef.current.rotation.z = 0;
              } else {
                for (let i = 0; i < number; i++) {
                  actions[actionsArr[i]].paused = false;
                  actions[actionsArr[i]].play();
                }
                setColor(!color);
                handleRef.current.rotation.z = -1.57;
              }
            }}
          />
          <mesh
            geometry={nodes.Sphere016.geometry}
            material={nodes.Sphere016.material}
            position={[1.58, 0, 0]}
            scale={[0.04, 0.04, 0.04]}
            onClick={(e) => {
              const actionsArr = Object.keys(actions);
              if (handleRef.current.rotation.z !== 0) {
                for (let i = 0; i < number; i++) {
                  actions[actionsArr[i]].paused = true;
                }
                setColor(!color);
                handleRef.current.rotation.z = 0;
              } else {
                for (let i = 0; i < number; i++) {
                  actions[actionsArr[i]].paused = false;
                  actions[actionsArr[i]].play();
                }
                setColor(!color);
                handleRef.current.rotation.z = -1.57;
              }
            }}
          />
          <mesh
            ref={handleRef}
            geometry={nodes.handle.geometry}
            material={nodes.handle.material}
            position={[1.63, 0, 0.01]}
            rotation={[0, 0, -1.57]}
            scale={[1.16, 0.24, 1.16]}
            onClick={() => {
              const actionsArr = Object.keys(actions);
              if (handleRef.current.rotation.z !== 0) {
                for (let i = 0; i < number; i++) {
                  actions[actionsArr[i]].paused = true;
                }
                setColor(!color);
                handleRef.current.rotation.z = 0;
              } else {
                for (let i = 0; i < number; i++) {
                  actions[actionsArr[i]].paused = false;
                }
                handleRef.current.rotation.z = -1.57;
                setColor(!color);
              }
            }}
          />
        </group>
      </group>
    </>
  );
};

useGLTF.preload("/circuit.glb");

export default CircuitDiag;
