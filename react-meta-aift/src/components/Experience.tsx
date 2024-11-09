import { OrbitControls, Stage } from "@react-three/drei";
import React from "react";
import Model from "./Model";

const Experience = () => {
  return (
    <>
      <color attach="background" args={["#101010"]} />

      {/* <OrbitControls enableZoom={false} /> */}
      <Stage environment="sunset" castShadow />

      <group position={[0, -4.8, 8.8]}>
        <Model
          model={"assets/Nong2.glb"}
          animate={["Talk", "HeadTalk"]}
          scale={6}
        />
      </group>
    </>
  );
};

export default Experience;
