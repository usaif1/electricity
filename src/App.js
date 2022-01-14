import "./App.css";

import Conductor from "./3D/Conductor";

function App() {
  return (
    <div style={{ width: "65%", margin: "auto", position: "relative" }}>
      <div>Electricity</div>
      <Conductor />
    </div>
  );
}

export default App;
