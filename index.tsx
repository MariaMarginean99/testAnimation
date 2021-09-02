import React from "react";
import { Canvas } from "@react-three/fiber";
import Lights from "../components/Light";
import Model from "../components/Model";

const App = () => {

  return (
    <>
      <Canvas style={{height:900}} camera={{ position: [0, 0, -50] }}>
        <Lights />
        <Model />
      </Canvas>
    </>
  );
};

export default App;
