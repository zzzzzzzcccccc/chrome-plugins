import * as PIXI from 'pixi.js';
import pixiStore from '../pixi-store';

const config = {
  size: 16,
  radius: 8,
  ySpace: 50,
};

class PixiSpriteRotateButton {
  private readonly container: PIXI.Container;
  private readonly line: PIXI.Graphics;
  private readonly button: PIXI.Graphics;

  constructor(
    private readonly sprite: PIXI.Container,
    private readonly onRotateStart?: (event: PIXI.FederatedPointerEvent) => void,
  ) {
    this.container = new PIXI.Container();
    this.line = new PIXI.Graphics();
    this.button = new PIXI.Graphics();
  }

  public draw(hidden = false) {
    this.drawLine(hidden);
    this.drawButton(hidden);
    this.container.addChild(this.line, this.button);
  }

  private drawLine(hidden: boolean) {
    this.line.clear();
    if (!hidden) {
      this.line.lineStyle(1, pixiStore.configuration?.theme.palette.primary.main);
      this.line.moveTo(this.sprite.x + this.sprite.width / 2, this.sprite.y - config.ySpace);
      this.line.lineTo(this.sprite.x + this.sprite.width / 2, this.sprite.y);
    }
    this.line.endFill();
  }

  private drawButton(hidden: boolean) {
    this.button.clear();
    if (hidden) {
      this.button.off('pointerdown', (event) => this.onRotateStart?.(event));
      this.button.interactive = false;
    } else {
      this.button.beginFill(pixiStore.configuration?.theme.palette.primary.main);
      this.button.drawRoundedRect(
        this.sprite.x + this.sprite.width / 2 - config.size / 2,
        this.sprite.y - config.size / 2 - config.ySpace,
        config.size,
        config.size,
        config.radius,
      );
      this.button.interactive = true;
      this.button.cursor = 'pointer';
      this.button.on('pointerdown', (event) => this.onRotateStart?.(event));
    }
    this.button.endFill();
  }

  get current() {
    return this.container;
  }
}

export default PixiSpriteRotateButton;
