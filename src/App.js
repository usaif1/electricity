import { useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css";
import { DoubleSide, TextureLoader } from "three";

//imports
import Conductor from "./components/Conductor";
import metalrod from "./assets/metalrod.jpg";

function App() {
  const [cylinderDimensions, setCylinderDimensions] = useState([
    0.1,
    0.1,
    2,
    32,
    32,
    true,
  ]);

  return (
    <div className="App" style={{ height: "100vh" }}>
      <Canvas
       camera={{ position: [0.5, 0.5, 3] }}
      >
        <axesHelper />
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
}

export default App;
