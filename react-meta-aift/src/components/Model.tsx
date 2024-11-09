import React from "react";
import { useAnimations } from "@react-three/drei";
import { GroupProps, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type ModelProps = GroupProps & {
  model: string;
  animate?: string[];
};

const Model: React.FC<ModelProps> = ({
  model,
  animate = ["Idle"],
  ...props
}: ModelProps) => {
  const group = React.useRef(null);
  const { scene, animations } = useLoader(GLTFLoader, model);
  const { actions, names } = useAnimations(animations, group);
  console.log("names", names);

  React.useEffect(() => {
    animate.map((anim) => actions[anim]?.reset().fadeIn(0.5).play());
  }, [animate]);

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
