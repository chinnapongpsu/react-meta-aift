import React from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Stage } from "@react-three/drei";

import Model from "./Model";

const Viewer: React.FC = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ fov: 10, position: [0, 1, 5] }}
      style={{ position: "absolute" }}
    >
      <color attach="background" args={["#101010"]} />

      <Stage environment="sunset" intensity={1} adjustCamera>
        <PresentationControls>
          <Model
            model={"assets/Nong3.glb"}
            animation={"Idle"}
            scale={1}
            position={[0, -1.5, 0]}
          />
        </PresentationControls>
      </Stage>
    </Canvas>
  );
};

export default Viewer;
