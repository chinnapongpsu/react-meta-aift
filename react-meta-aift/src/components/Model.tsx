import React from "react";
import { useGLTF } from "@react-three/drei";
import { PrimitiveProps } from "@react-three/fiber";

type ModelProps = Omit<PrimitiveProps, "object"> & {
  model: string;
  animation: string;
};

const Model: React.FC<ModelProps> = ({
  model,
  animation,
  ...props
}: ModelProps) => {
  const { scene, nodes, animations } = useGLTF(model);

  return (
    <mesh>
      <primitive object={scene} {...props} />
    </mesh>
  );
};

export default Model;
