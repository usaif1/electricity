import "./App.css";
import { useState } from "react";
import Conductor from "./3D/Conductor";
import CrossSection from "./3D/CrossSection";
import Circuit from "./3D/Circuit";

function App() {
  const [frameloop, setFrameloop] = useState("always");

  return (
    <div style={{ width: "65%", margin: "auto", position: "relative" }}>
      <div>Electricity</div>
      {/* <Conductor /> */}
      {/* <CrossSection frameloop={frameloop} /> */}
      <Circuit />
    </div>
  );
}

export default App;
