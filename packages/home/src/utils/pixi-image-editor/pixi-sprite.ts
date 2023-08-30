import * as PIXI from 'pixi.js';
import { ImageConfig, ResizeButton, SpriteActionType } from './types';

const RESIZE_BUTTON_SIZE = 10;
const RESIZE_BUTTON_RADIUS = 2;
const RESIZE_BUTTONS: Record<string, ResizeButton> = {
  topLeft: { size: RESIZE_BUTTON_SIZE, radius: RESIZE_BUTTON_RADIUS, cursor: 'se-resize' },
  topCenter: { size: RESIZE_BUTTON_SIZE, radius: RESIZE_BUTTON_RADIUS, cursor: 'n-resize' },
  topRight: { size: RESIZE_BUTTON_SIZE, radius: RESIZE_BUTTON_RADIUS, cursor: 'sw-resize' },
  rightCenter: { size: RESIZE_BUTTON_SIZE, radius: RESIZE_BUTTON_RADIUS, cursor: 'e-resize' },
  bottomRight: { size: RESIZE_BUTTON_SIZE, radius: RESIZE_BUTTON_RADIUS, cursor: 'se-resize' },
  bottomCenter: { size: RESIZE_BUTTON_SIZE, radius: RESIZE_BUTTON_RADIUS, cursor: 'n-resize' },
  bottomLeft: { size: RESIZE_BUTTON_SIZE, radius: RESIZE_BUTTON_RADIUS, cursor: 'sw-resize' },
  leftCenter: { size: RESIZE_BUTTON_SIZE, radius: RESIZE_BUTTON_RADIUS, cursor: 'e-resize' },
};
const PRIMARY_COLOR = '#007FFF';

class PixiSprite {
  private readonly containerInstance: PIXI.Container;
  private readonly spriteInstance: PIXI.Sprite;
  private readonly borderInstance: PIXI.Graphics;
  private readonly resizeButtonsInstance: Record<string, PIXI.Graphics> = {};

  private enableTools = false;
  private currentMoveXY: [number, number] | null = null;
  private currentResize: { position: string; XY: [number, number]; WH: [number, number] } | null = null;

  constructor(
    private readonly imageConfig: ImageConfig,
    private readonly onChange?: (type: SpriteActionType, target: PixiSprite) => void,
  ) {
    this.containerInstance = new PIXI.Container();
    this.spriteInstance = PIXI.Sprite.from(this.imageConfig.url);
    this.borderInstance = new PIXI.Graphics();
    this.resizeButtonsInstance = Object.keys(RESIZE_BUTTONS).reduce(
      (acc: Record<string, PIXI.Graphics>, position: string) => {
        acc[position] = new PIXI.Graphics();
        return acc;
      },
      {},
    );
    this.init();
  }

  public init() {
    this.drawSprite();
    this.emitOnChange(SpriteActionType.Init);
    this.containerInstance.addChild(
      this.spriteInstance,
      this.borderInstance,
      ...Object.values(this.resizeButtonsInstance),
    );
  }

  public drawTools() {
    this.enableTools = true;
    this.drawBorder();
    this.drawResizeButtons();
  }

  public hiddenTools() {
    this.enableTools = false;
    this.drawBorder();
    this.drawResizeButtons();
  }

  public emitOnChange(type: SpriteActionType) {
    this.drawTools();
    this.onChange?.(type, this);
  }

  public handleOnPointermoveEnd(event: PIXI.FederatedPointerEvent) {
    if (!this.currentMoveXY) return;
    this.spriteInstance.alpha = 1;
    this.spriteInstance.cursor = 'pointer';
    this.currentMoveXY = null;
    this.emitOnChange(SpriteActionType.Drag);
  }

  public handleOnPointermove(event: PIXI.FederatedPointerEvent) {
    if (!this.currentMoveXY) return;
    const [startX, startY] = this.currentMoveXY;
    const [moveX, moveY] = [event.global.x, event.global.y];
    this.spriteInstance.position.set(
      this.spriteInstance.x + (moveX - startX),
      this.spriteInstance.y + (moveY - startY),
    );
    this.currentMoveXY = [moveX, moveY];
    this.emitOnChange(SpriteActionType.Drag);
  }

  public handleOnResizeButtonPointermoveEnd(event: PIXI.FederatedPointerEvent) {
    if (!this.currentResize) return;
    this.currentResize = null;
    this.emitOnChange(SpriteActionType.Resize);
  }

  public handleOnResizeButtonPointermove(event: PIXI.FederatedPointerEvent) {
    if (!this.currentResize) return;
    const { position, WH, XY } = this.currentResize;
    const [[SW, SH], [SX, SY], [MX, MY]] = [WH, XY, [event.global.x, event.global.y]];
    const [diffX, diffY] = [MX - SX, MY - SY];
    const resizeFactory: Record<string, () => void> = {
      topLeft: () => {
        this.spriteInstance.width = Math.max(SW - diffX, 0);
        this.spriteInstance.height = Math.max(SH - diffY, 0);
        this.spriteInstance.x = SX + diffX;
        this.spriteInstance.y = SY + diffY;
      },
      topCenter: () => {
        this.spriteInstance.height = Math.max(SH - diffY, 0);
        this.spriteInstance.y = SY + diffY;
      },
      topRight: () => {
        this.spriteInstance.width = Math.max(SW + diffX, 0);
        this.spriteInstance.height = Math.max(SH - diffY, 0);
        this.spriteInstance.y = SY + diffY;
      },
      rightCenter: () => {
        this.spriteInstance.width = Math.max(SW + diffX, 0);
      },
      bottomRight: () => {
        this.spriteInstance.width = Math.max(SW + diffX, 0);
        this.spriteInstance.height = Math.max(SH + diffY, 0);
      },
      bottomCenter: () => {
        this.spriteInstance.height = Math.max(SH + diffY, 0);
      },
      bottomLeft: () => {
        this.spriteInstance.width = Math.max(SW - diffX, 0);
        this.spriteInstance.height = Math.max(SH + diffY, 0);
        this.spriteInstance.x = SX + diffX;
      },
      leftCenter: () => {
        this.spriteInstance.width = Math.max(SW - diffX, 0);
        this.spriteInstance.x = SX + diffX;
      },
    };
    resizeFactory[position]();
    this.emitOnChange(SpriteActionType.Resize);
  }

  private handleOnPointerdown(event: PIXI.FederatedPointerEvent) {
    this.currentMoveXY = [event.global.x, event.global.y];
    this.spriteInstance.alpha = 0.5;
    this.spriteInstance.cursor = 'move';
    this.emitOnChange(SpriteActionType.PointerDown);
  }

  private handleOnResizeButtonPointerdown(position: string, event: PIXI.FederatedPointerEvent) {
    event.stopImmediatePropagation();
    this.currentResize = {
      position,
      XY: [event.global.x, event.global.y],
      WH: [this.spriteInstance.width, this.spriteInstance.height],
    };
    this.emitOnChange(SpriteActionType.PointerDown);
  }

  private drawSprite() {
    this.spriteInstance.width = this.imageConfig.width;
    this.spriteInstance.height = this.imageConfig.height;
    this.spriteInstance.x = 0;
    this.spriteInstance.y = 0;
    this.spriteInstance.cursor = 'pointer';
    this.spriteInstance.interactive = true;
    this.spriteInstance.on('pointerdown', (event) => this.handleOnPointerdown(event));
  }

  private drawBorder() {
    this.borderInstance.clear();
    if (!this.enableTools) {
      this.borderInstance.endFill();
    } else {
      this.borderInstance.lineStyle(1, PRIMARY_COLOR);
      this.borderInstance.drawRect(
        this.spriteInstance.x,
        this.spriteInstance.y,
        this.spriteInstance.width,
        this.spriteInstance.height,
      );
    }
    this.borderInstance.endFill();
  }

  private drawResizeButtons() {
    Object.keys(RESIZE_BUTTONS).forEach((position) => {
      const config = RESIZE_BUTTONS[position];
      const instance = this.resizeButtonsInstance[position];
      const drawFactory: Record<string, () => void> = {
        topLeft: () =>
          instance.drawRoundedRect(
            this.spriteInstance.x - config.size / 2,
            this.spriteInstance.y - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        topCenter: () =>
          instance.drawRoundedRect(
            this.spriteInstance.x + this.spriteInstance.width / 2 - config.size / 2,
            this.spriteInstance.y - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        topRight: () =>
          instance.drawRoundedRect(
            this.spriteInstance.x + this.spriteInstance.width - config.size / 2,
            this.spriteInstance.y - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        rightCenter: () =>
          instance.drawRoundedRect(
            this.spriteInstance.x + this.spriteInstance.width - config.size / 2,
            this.spriteInstance.y + this.spriteInstance.height / 2 - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        bottomRight: () =>
          instance.drawRoundedRect(
            this.spriteInstance.x + this.spriteInstance.width - config.size / 2,
            this.spriteInstance.y + this.spriteInstance.height - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        bottomCenter: () =>
          instance.drawRoundedRect(
            this.spriteInstance.x + this.spriteInstance.width / 2 - config.size / 2,
            this.spriteInstance.y + this.spriteInstance.height - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        bottomLeft: () =>
          instance.drawRoundedRect(
            this.spriteInstance.x - config.size / 2,
            this.spriteInstance.y + this.spriteInstance.height - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        leftCenter: () =>
          instance.drawRoundedRect(
            this.spriteInstance.x - config.size / 2,
            this.spriteInstance.y + this.spriteInstance.height / 2 - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
      };
      instance.clear();
      if (!this.enableTools) {
        instance.off('pointerdown', (event) => this.handleOnResizeButtonPointerdown(position, event));
        instance.interactive = false;
      } else {
        instance.beginFill(PRIMARY_COLOR);
        drawFactory[position]();
        instance.interactive = true;
        instance.cursor = config.cursor;
        instance.on('pointerdown', (event) => this.handleOnResizeButtonPointerdown(position, event));
      }
      instance.endFill();
    });
  }

  get container() {
    return this.containerInstance;
  }
}

export default PixiSprite;
