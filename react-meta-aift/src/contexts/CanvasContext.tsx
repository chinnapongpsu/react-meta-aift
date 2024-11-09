import React from "react";

import { ICanvas } from "../interfaces/canvas";

export const CanvasContext = React.createContext<ICanvas | null>(null);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [blendShapes, setBlendShapes] = React.useState<string>("");
  const [curFrame, setCurFrame] = React.useState<number>(0);
  const [isAnimating, setIsAnimating] = React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<number>(0);

  // Function to start the animation
  const startAnimation = () => {
    setIsAnimating(true);
  };

  // Function to stop the animation
  const stopAnimation = () => {
    setIsAnimating(false);
    // setCurFrame(0); // Optionally reset to the first frame when starting
  };

  const canvasProvider = {
    blendShapes,
    setBlendShapes,

    curFrame,
    setCurFrame,
    isAnimating,
    setIsAnimating,

    startAnimation,
    stopAnimation,

    selectedId,
    setSelectedId,
  };

  return (
    <CanvasContext.Provider value={canvasProvider}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = React.useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvas must be use inside <CanvasProvider>");
  }
  return context;
};

export default CanvasProvider;
