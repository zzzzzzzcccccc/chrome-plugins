export interface ImageConfig {
  name: string;
  type: string;
  size: number;
  width: number;
  height: number;
  url: string;
}

export type ResizeButton = {
  size: number;
  radius: number;
  cursor: string;
};

export enum SpriteActionType {
  Init = 'init',
  PointerDown = 'pointerDown',
  Drag = 'drag',
  Resize = 'resize',
}
