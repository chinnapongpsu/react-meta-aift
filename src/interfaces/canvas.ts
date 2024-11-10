export interface ICanvas {
  blendShapes: string;
  setBlendShapes: React.Dispatch<React.SetStateAction<string>>;

  curFrame: number;
  setCurFrame: React.Dispatch<React.SetStateAction<number>>;
  isAnimating: boolean;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;

  startAnimation: () => void;
  stopAnimation: () => void;

  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
}
