import * as PIXI from 'pixi.js';
import pixiStore from '../pixi-store';

class PixiSpriteBorder {
  private readonly border: PIXI.Graphics;

  constructor(private readonly sprite: PIXI.Sprite) {
    this.border = new PIXI.Graphics();
  }

  draw(hidden = false) {
    this.border.clear();
    if (!hidden) {
      this.border.lineStyle(1, pixiStore.configuration?.theme.palette.primary.main);
      this.border.drawRect(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
    }
    this.border.endFill();
  }

  get current() {
    return this.border;
  }
}

export default PixiSpriteBorder;
