import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";

import Model from "./Model";

const Viewer: React.FC = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ fov: 20  }}
      style={{ position: "absolute" }}
    >
      <color attach="background" args={["#101010"]} />

      <Stage environment="sunset" intensity={1} adjustCamera>
        <Model
          model={"assets/Nong2.glb"}
          animation={"idle"}
          scale={1}
          position={[0, -1.5, 0]}
        />
      </Stage>
    </Canvas>
  );
};

export default Viewer;
