import React, { useEffect } from "react";
import { SkinnedMesh } from "three";
import { useAnimations } from "@react-three/drei";
import { GroupProps, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { useCanvas } from "../contexts/CanvasContext";

type ModelProps = GroupProps & {
  model: string;
  animate?: string[];
  arkitFrames: number[][];
};

const Model: React.FC<ModelProps> = ({
  model,
  animate = ["Idle"],
  arkitFrames = [],
  ...props
}: ModelProps) => {
  const { curFrame, setCurFrame, isAnimating, stopAnimation } = useCanvas();

  const group = React.useRef(null);
  const { scene, nodes, animations } = useLoader(GLTFLoader, model);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[animate[0]]?.reset().fadeIn(0.5).play();
  }, []);

  // Play the animation (Idle or any other specified in animate array)
  React.useEffect(() => {
    if (arkitFrames.length > 0) {
      const arkitCoefficients = arkitFrames[curFrame];
      const mouthMesh = nodes.face as SkinnedMesh;

      if (mouthMesh.morphTargetInfluences) {
        const mouthOpenValue = arkitCoefficients[26] * 1.0; // jawOpen

        // Calculate MouthSmile
        const mouthSmileValue =
          (arkitCoefficients[30] + arkitCoefficients[31]) / 2; // mouthSmile_L + mouthSmile_R

        if (!isNaN(mouthOpenValue) && !isNaN(mouthSmileValue)) {
          mouthMesh.morphTargetInfluences[0] = mouthOpenValue;
          mouthMesh.morphTargetInfluences[1] = mouthSmileValue;
        }
      }
    }
  }, [curFrame, arkitFrames, nodes]);

  // Update mouth blend shapes based on ARKit frames when animating
  useFrame(() => {
    if (arkitFrames.length > 0 && isAnimating) {
      const frameData = arkitFrames[curFrame];
      const jawOpenValue = frameData[26]; // Assuming index 26 corresponds to jawOpen

      // Access the mouth mesh and set morph target influences for mouth movement
      const mouthMesh = nodes.face as SkinnedMesh;
      if (mouthMesh && mouthMesh.morphTargetInfluences) {
        mouthMesh.morphTargetInfluences[0] = jawOpenValue; // Adjust the mouth opening
      }

      // Move to the next frame or reset to the first frame if at the end
      setCurFrame((prevFrame) => (prevFrame + 1) % arkitFrames.length);

      // Stop animation automatically if it reaches the last frame (optional)
      if (curFrame === arkitFrames.length - 1) {
        stopAnimation();
      }
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="scene">
        <group name="Chinna" scale={0.5}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
};

export default Model;
