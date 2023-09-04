import * as PIXI from 'pixi.js';
import pixiStore from '../pixi-store';
import { ResizeButton } from '../types';

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

class PixiSpriteResizeButtons {
  private readonly buttons: Record<string, PIXI.Graphics> = {};

  constructor(
    private readonly sprite: PIXI.Sprite,
    private readonly onResizeStart?: (position: string, event: PIXI.FederatedPointerEvent) => void,
  ) {
    this.buttons = Object.keys(RESIZE_BUTTONS).reduce((acc: Record<string, PIXI.Graphics>, position) => {
      acc[position] = new PIXI.Graphics();
      return acc;
    }, {});
  }

  draw(hidden = false) {
    Object.keys(RESIZE_BUTTONS).forEach((position) => {
      const config = RESIZE_BUTTONS[position];
      const instance = this.buttons[position];
      const drawFactory: Record<string, () => void> = {
        topLeft: () =>
          instance.drawRoundedRect(
            this.sprite.x - config.size / 2,
            this.sprite.y - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        topCenter: () =>
          instance.drawRoundedRect(
            this.sprite.x + this.sprite.width / 2 - config.size / 2,
            this.sprite.y - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        topRight: () =>
          instance.drawRoundedRect(
            this.sprite.x + this.sprite.width - config.size / 2,
            this.sprite.y - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        rightCenter: () =>
          instance.drawRoundedRect(
            this.sprite.x + this.sprite.width - config.size / 2,
            this.sprite.y + this.sprite.height / 2 - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        bottomRight: () =>
          instance.drawRoundedRect(
            this.sprite.x + this.sprite.width - config.size / 2,
            this.sprite.y + this.sprite.height - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        bottomCenter: () =>
          instance.drawRoundedRect(
            this.sprite.x + this.sprite.width / 2 - config.size / 2,
            this.sprite.y + this.sprite.height - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        bottomLeft: () =>
          instance?.drawRoundedRect(
            this.sprite.x - config.size / 2,
            this.sprite.y + this.sprite.height - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
        leftCenter: () =>
          instance.drawRoundedRect(
            this.sprite.x - config.size / 2,
            this.sprite.y + this.sprite.height / 2 - config.size / 2,
            config.size,
            config.size,
            config.radius,
          ),
      };
      instance.clear();
      if (hidden) {
        instance.off('pointerdown', (event) => this.onResizeStart?.(position, event));
        instance.interactive = false;
      } else {
        instance.beginFill(pixiStore.configuration?.theme.palette.primary.main);
        drawFactory[position]();
        instance.interactive = true;
        instance.cursor = config.cursor;
        instance.on('pointerdown', (event) => this.onResizeStart?.(position, event));
      }
      instance.endFill();
    });
  }

  get current() {
    return this.buttons;
  }
}

export default PixiSpriteResizeButtons;
