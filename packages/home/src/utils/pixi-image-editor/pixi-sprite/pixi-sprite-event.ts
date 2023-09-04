import * as PIXI from 'pixi.js';
import { PixiSpriteEventOptions } from '../types';

class PixiSpriteEvent {
  private currentMoveXY: [number, number] | null = null;
  private currentResize: { position: string; XY: [number, number]; WH: [number, number] } | null = null;
  private currentRotate: { XY: [number, number] } | null = null;

  constructor(
    private container: PIXI.Container,
    private readonly sprite: PIXI.Sprite,
    private readonly options?: PixiSpriteEventOptions,
  ) {}

  public dragEnd() {
    if (!this.currentMoveXY) return;
    this.sprite.alpha = 1;
    this.sprite.cursor = 'pointer';
    this.container.zIndex = 0;
    this.currentMoveXY = null;
    this.options?.onDragEnd?.();
  }

  public drag(event: PIXI.FederatedPointerEvent) {
    if (!this.currentMoveXY) return;
    const [startX, startY] = this.currentMoveXY;
    const [moveX, moveY] = [event.global.x, event.global.y];
    this.sprite.transform.position.set(this.sprite.x + (moveX - startX), this.sprite.y + (moveY - startY));
    this.currentMoveXY = [moveX, moveY];
    this.options?.onDrag?.();
  }

  public dragStart(event: PIXI.FederatedPointerEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.currentMoveXY = [event.global.x, event.global.y];
    this.sprite.alpha = 0.5;
    this.sprite.cursor = 'move';
    this.container.zIndex = 10;
    this.options?.onDragStart?.();
  }

  public resizeEnd() {
    if (!this.currentResize) return;
    this.currentResize = null;
    this.options?.onResizeEnd?.();
  }

  public resize(event: PIXI.FederatedPointerEvent) {
    if (!this.currentResize) return;
    const { position, WH, XY } = this.currentResize;
    const [[SW, SH], [SX, SY], [MX, MY]] = [WH, XY, [event.global.x, event.global.y]];
    const [diffX, diffY] = [MX - SX, MY - SY];
    const resizeFactory: Record<string, () => void> = {
      topLeft: () => {
        this.sprite.width = Math.max(SW - diffX, 0);
        this.sprite.height = Math.max(SH - diffY, 0);
        this.sprite.transform.position.set(SX + diffX, SY + diffY);
      },
      topCenter: () => {
        this.sprite.height = Math.max(SH - diffY, 0);
        this.sprite.transform.position.y = SY + diffY;
      },
      topRight: () => {
        this.sprite.width = Math.max(SW + diffX, 0);
        this.sprite.height = Math.max(SH - diffY, 0);
        this.sprite.transform.position.y = SY + diffY;
      },
      rightCenter: () => {
        this.sprite.width = Math.max(SW + diffX, 0);
      },
      bottomRight: () => {
        this.sprite.width = Math.max(SW + diffX, 0);
        this.sprite.height = Math.max(SH + diffY, 0);
      },
      bottomCenter: () => {
        this.sprite.height = Math.max(SH + diffY, 0);
      },
      bottomLeft: () => {
        this.sprite.width = Math.max(SW - diffX, 0);
        this.sprite.height = Math.max(SH + diffY, 0);
        this.sprite.transform.position.x = SX + diffX;
      },
      leftCenter: () => {
        this.sprite.width = Math.max(SW - diffX, 0);
        this.sprite.transform.position.x = SX + diffX;
      },
    };
    resizeFactory[position]();
    this.options?.onResize?.();
  }

  public resizeStart(position: string, event: PIXI.FederatedPointerEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.currentResize = {
      position,
      XY: [event.global.x, event.global.y],
      WH: [this.sprite.width, this.sprite.height],
    };
    this.options?.onResizeStart?.();
  }

  public rotateEnd() {
    if (!this.currentRotate) return;
    this.currentRotate = null;
    this.options?.onRotateEnd?.();
  }

  public rotate(event: PIXI.FederatedPointerEvent) {
    if (!this.currentRotate) return;
    const { XY } = this.currentRotate;
    const [localStartX, localStartY] = XY;
    const localRotation = Math.atan2(localStartY, localStartX);
    const position = event.getLocalPosition(this.container);
    const rotation = Math.atan2(position.y, position.x);
    this.container.transform.rotation += ((rotation - localRotation) * Math.PI) / 180;
    this.options?.onRotate?.();
  }

  public rotateStart(event: PIXI.FederatedPointerEvent) {
    event.stopImmediatePropagation();
    const position = event.getLocalPosition(this.container);
    this.currentRotate = { XY: [position.x, position.y] };
    this.options?.onRotateStart?.();
  }
}

export default PixiSpriteEvent;
