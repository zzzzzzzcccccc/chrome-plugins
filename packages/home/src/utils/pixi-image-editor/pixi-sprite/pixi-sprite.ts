import * as PIXI from 'pixi.js';
import PixiSpriteEvent from './pixi-sprite-event';
import PixiSpriteBorder from './pixi-sprite-border';
import PixiSpriteResizeButtons from './pixi-sprite-resize-buttons';
import PixiSpriteRotateButton from './pixi-sprite-rotate-button';
import PixiSpriteInfo from './pixi-sprite-info';
import { ImageConfig, SpriteActionType } from '../types';

class PixiSprite {
  private readonly containerInstance: PIXI.Container;
  private readonly spriteInstance: PIXI.Sprite;
  private readonly pixiSpriteInfoInstance: PixiSpriteInfo;
  private readonly pixiSpriteEventInstance: PixiSpriteEvent;
  private readonly borderInstance: PixiSpriteBorder;
  private readonly resizeButtonsInstance: PixiSpriteResizeButtons;
  private readonly rotateButtonInstance: PixiSpriteRotateButton;

  constructor(
    private readonly imageConfig: ImageConfig,
    private readonly onChange?: (type: SpriteActionType, target: PixiSprite) => void,
  ) {
    this.containerInstance = new PIXI.Container();
    this.containerInstance.zIndex = 0;

    this.spriteInstance = new PIXI.Sprite(PIXI.Texture.from(imageConfig.url));

    this.pixiSpriteInfoInstance = new PixiSpriteInfo(this.container, this.sprite);

    this.pixiSpriteEventInstance = new PixiSpriteEvent(this.containerInstance, this.spriteInstance, {
      onDragStart: () => this.emitOnChange(SpriteActionType.DragStart),
      onDrag: () => {
        this.pixiSpriteInfoInstance.drawXY();
        this.emitOnChange(SpriteActionType.Drag);
      },
      onDragEnd: () => {
        this.pixiSpriteInfoInstance.drawXY(true);
        this.emitOnChange(SpriteActionType.DragEnd);
      },
      onResizeStart: () => this.emitOnChange(SpriteActionType.ResizeStart),
      onResize: () => {
        this.pixiSpriteInfoInstance.drawWH();
        this.emitOnChange(SpriteActionType.Resize);
      },
      onResizeEnd: () => {
        this.pixiSpriteInfoInstance.drawWH(true);
        this.emitOnChange(SpriteActionType.ResizeEnd);
      },
      onRotateStart: () => this.emitOnChange(SpriteActionType.RotateStart),
      onRotate: () => {
        this.pixiSpriteInfoInstance.drawRotate();
        this.emitOnChange(SpriteActionType.Rotate);
      },
      onRotateEnd: () => {
        this.pixiSpriteInfoInstance.drawRotate(true);
        this.emitOnChange(SpriteActionType.RotateEnd);
      },
    });

    this.borderInstance = new PixiSpriteBorder(this.spriteInstance);

    this.resizeButtonsInstance = new PixiSpriteResizeButtons(this.spriteInstance, (position, event) =>
      this.pixiSpriteEventInstance.resizeStart(position, event),
    );

    this.rotateButtonInstance = new PixiSpriteRotateButton(this.spriteInstance, (event) =>
      this.pixiSpriteEventInstance.rotateStart(event),
    );

    this.init();
  }

  public init() {
    this.draw();
    this.showTools();
    this.spriteInstance.interactive = true;
    this.spriteInstance.on('pointerdown', (event) => this.pixiSpriteEventInstance.dragStart(event));
    this.containerInstance.addChild(
      this.spriteInstance,
      this.borderInstance.current,
      this.rotateButtonInstance.current,
      ...Object.values(this.resizeButtonsInstance.current),
      ...Object.values(this.pixiSpriteInfoInstance.current),
    );
  }

  public showTools() {
    this.borderInstance.draw();
    this.resizeButtonsInstance.draw();
    this.rotateButtonInstance.draw();
  }

  public hiddenTools() {
    this.borderInstance.draw(true);
    this.resizeButtonsInstance.draw(true);
    this.rotateButtonInstance.draw(true);
  }

  private emitOnChange(type: SpriteActionType) {
    if (![SpriteActionType.DragStart, SpriteActionType.ResizeStart].includes(type)) {
      this.showTools();
    }
    this.onChange?.(type, this);
  }

  private draw() {
    this.spriteInstance.width = this.imageConfig.width;
    this.spriteInstance.height = this.imageConfig.height;
    this.spriteInstance.x = 0;
    this.spriteInstance.y = 0;
    this.spriteInstance.cursor = 'pointer';
  }

  get config() {
    return this.imageConfig;
  }

  get container() {
    return this.containerInstance;
  }

  get event() {
    return this.pixiSpriteEventInstance;
  }

  get sprite() {
    return this.spriteInstance;
  }
}

export default PixiSprite;
