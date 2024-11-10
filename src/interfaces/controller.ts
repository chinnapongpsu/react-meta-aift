export interface IOptions {
  id: number;
  startIcon?: JSX.Element;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export interface IController {
  id?: number;
  defaultOption?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  options?: IOptions[];
}
