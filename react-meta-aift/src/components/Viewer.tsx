import React from "react";
import { Canvas } from "@react-three/fiber";

import Experience from "./Experience";

const Viewer: React.FC = () => (
  <Canvas shadows camera={{ position: [0, 0, 5], fov: 20 }}>
    <Experience />
  </Canvas>
);

export default Viewer;
