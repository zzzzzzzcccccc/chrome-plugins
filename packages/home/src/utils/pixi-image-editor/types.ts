import { Theme } from '@mui/material/styles';
import PixiSprite from './pixi-sprite';

export type PointerEventType = 'pointerdown' | 'pointermove' | 'pointerup' | 'pointerupOutside';

export enum SpriteActionType {
  DragStart = 'DragStart',
  Drag = 'Drag',
  DragEnd = 'DragEnd',
  ResizeStart = 'ResizeStart',
  Resize = 'Resize',
  ResizeEnd = 'ResizeEnd',
  RotateStart = 'RotateStart',
  Rotate = 'Rotate',
  RotateEnd = 'RotateEnd',
}

export type PixiSprites = Map<string, PixiSprite>;

export interface CreateAppPayload {
  theme: Theme;
}

export interface OnChangePayload {
  type: SpriteActionType;
  instance: PixiSprite;
}

export interface ImageConfig {
  width: number;
  height: number;
  url: string;
}

export type ResizeButton = {
  size: number;
  radius: number;
  cursor: string;
};

export interface PixiSpriteEventOptions {
  onDragStart?: () => void;
  onDrag?: () => void;
  onDragEnd?: () => void;
  onResizeStart?: () => void;
  onResize?: () => void;
  onResizeEnd?: () => void;
  onRotateStart?: () => void;
  onRotate?: () => void;
  onRotateEnd?: () => void;
}
