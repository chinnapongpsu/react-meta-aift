import React from "react";
import { Stage } from "@react-three/drei";

import { useCanvas } from "../contexts/CanvasContext";
import Model from "./Model";

const Experience = () => {
  const { blendShapes } = useCanvas();

  const [arkitFrames, setArkitFrames] = React.useState<number[][]>([]);

  const loadArkitData = async () => {
    if (!blendShapes) return;

    const text = blendShapes;
    const frames = text
      .split("\n")
      .map((line) => line.split(",").map((num) => parseFloat(num)));

    setArkitFrames(frames);
  };

  React.useEffect(() => {
    loadArkitData();
  }, [blendShapes]);

  return (
    <>
      <color attach="background" args={["#101010"]} />

      {/* <OrbitControls enableZoom={false} /> */}
      <Stage environment="sunset" castShadow />

      {/* <group position={[0, -8.4, 4]}> */}
      <group position={[0, -3.6, 8.8]}>
        <Model
          model={"assets/Nong7.glb"}
          animate={["Idle", "HeadTalk"]}
          scale={5.6}
          arkitFrames={arkitFrames}
        />
      </group>
    </>
  );
};

export default Experience;
