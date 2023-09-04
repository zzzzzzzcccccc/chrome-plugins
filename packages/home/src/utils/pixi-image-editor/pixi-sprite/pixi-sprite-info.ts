import * as PIXI from 'pixi.js';
import pixiStore from '../pixi-store';

class PixiSpriteInfo {
  private readonly WH: PIXI.Text;
  private readonly XY: PIXI.Text;
  private readonly rotate: PIXI.Text;
  private readonly textStyle: PIXI.TextStyle;

  constructor(private readonly container: PIXI.Container, private readonly sprite: PIXI.Sprite) {
    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 24,
      fill: pixiStore.configuration?.theme.palette.primary.main,
      align: 'center',
    });

    this.WH = new PIXI.Text('', this.textStyle);
    this.XY = new PIXI.Text('', this.textStyle);
    this.rotate = new PIXI.Text('', this.textStyle);
  }

  public drawWH(hidden = false) {
    if (hidden) {
      this.WH.visible = false;
    } else {
      const width = Math.floor(this.sprite.width);
      const height = Math.floor(this.sprite.height);
      this.WH.text = `${width} x ${height}`;
      this.WH.position.set(...this.getPosition());
      this.WH.anchor.set(0.5);
      this.WH.visible = true;
    }
  }

  public drawXY(hidden = false) {
    if (hidden) {
      this.XY.visible = false;
    } else {
      const x = Math.floor(this.sprite.x);
      const y = Math.floor(this.sprite.y);
      this.XY.text = `${x} , ${y}`;
      this.XY.position.set(...this.getPosition());
      this.XY.anchor.set(0.5);
      this.XY.visible = true;
    }
  }

  public drawRotate(hidden = false) {
    if (hidden) {
      this.rotate.visible = false;
    } else {
      const rotate = Math.floor((this.container.rotation * 180) / Math.PI);
      this.rotate.text = `${rotate}°`;
      this.rotate.position.set(...this.getPosition());
      this.rotate.anchor.set(0.5);
      this.rotate.visible = true;
    }
  }

  private getPosition() {
    return [this.sprite.x + this.sprite.width / 2, this.sprite.y - 80];
  }

  get current() {
    return { WH: this.WH, XY: this.XY, rotate: this.rotate };
  }
}

export default PixiSpriteInfo;
