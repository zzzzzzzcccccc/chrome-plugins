import * as PIXI from 'pixi.js';
import pixiStore from './pixi-store';
import PixiSprite from './pixi-sprite';
import PixiStageEvent from './pixi-stage-event';
import { CreateAppPayload, ImageConfig, OnChangePayload, SpriteActionType } from './types';
import { createDownloadLink } from '../link';
import loadImage from '../load-image';

class PixiImageEditor {
  private appInstance: PIXI.Application | null = null;
  private pixiStageEvent: PixiStageEvent | null = null;
  private onChange?: (payload: OnChangePayload) => void;

  public createApp(payload: CreateAppPayload, onChangeCallback?: (payload: OnChangePayload) => void) {
    pixiStore.configuration = payload;
    this.onChange = onChangeCallback;

    if (!this.appInstance) {
      PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
      PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;

      this.appInstance = new PIXI.Application({
        resizeTo: window,
        antialias: true,
      });
      this.appInstance.stage.hitArea = this.appInstance.screen;
      this.appInstance.stage.sortableChildren = true;
    }
    this.pixiStageEvent = new PixiStageEvent(this.appInstance.stage);
    this.pixiStageEvent.on();
    this.pixiStageEvent.push('pointerdown', () => this.handleStageOnPointerDown());
    this.insertSpritesCache();
    return this.appInstance;
  }

  public destroy() {
    if (this.appInstance) {
      this.pixiStageEvent?.off();
      this.pixiStageEvent = null;

      this.onChange = void 0;
      this.appInstance.destroy(true);
      this.appInstance = null;

      pixiStore.configuration = null;
      pixiStore.selectedUrl = '';
    }
  }

  public clean() {
    pixiStore.selectedUrl = '';
    pixiStore.cleanPixiSprite();

    this.pixiStageEvent?.cleanCallbacks(['pointermove', 'pointerup', 'pointerupOutside']);
    this.appInstance?.stage.removeChildren();
  }

  public async pushImage(file: File) {
    if (/^image/gi.test(file.type)) {
      const url = URL.createObjectURL(file);
      const { image } = await loadImage(url);
      if (image) {
        const payload = { url, width: image.width, height: image.height };
        const pixiSprite = new PixiSprite(payload, (type, instance) => {
          this.handleSpriteOnChange(type, instance, payload);
          this.onChange?.({ type, instance });
        });

        pixiStore.selectedUrl = url;
        pixiStore.pushPixiSprite(url, pixiSprite);

        this.hiddenSpriteTools(url);
        this.appendSprite(pixiSprite);
      }
    }
  }

  public downloadImage() {
    this.hiddenSpriteTools();

    const canvas = this.appInstance?.renderer.extract.canvas(this.appInstance.stage, this.appInstance?.screen);

    if (canvas) {
      const url = canvas.toDataURL?.('image/png', 1) || '';
      const link = createDownloadLink(url, `image_${Date.now()}.png`);
      link.click();
      link.remove();
    }
  }

  private insertSpritesCache() {
    const sprites = pixiStore.pixiSprites;
    if (sprites.size) {
      this.hiddenSpriteTools();
      sprites.forEach((pixiSprite) => this.appendSprite(pixiSprite));
    }
  }

  private appendSprite(pixiSprite: PixiSprite) {
    this.appInstance?.stage.addChild(pixiSprite.container);

    this.pixiStageEvent?.push('pointermove', (event) => pixiSprite.event.drag(event));
    this.pixiStageEvent?.push('pointerup', () => pixiSprite.event.dragEnd());
    this.pixiStageEvent?.push('pointerupOutside', () => pixiSprite.event.dragEnd());

    this.pixiStageEvent?.push('pointermove', (event) => pixiSprite.event.resize(event));
    this.pixiStageEvent?.push('pointerup', () => pixiSprite.event.resizeEnd());
    this.pixiStageEvent?.push('pointerupOutside', () => pixiSprite.event.resizeEnd());

    this.pixiStageEvent?.push('pointermove', (event) => pixiSprite.event.rotate(event));
    this.pixiStageEvent?.push('pointerup', () => pixiSprite.event.rotateEnd());
    this.pixiStageEvent?.push('pointerupOutside', () => pixiSprite.event.rotateEnd());
  }

  private handleStageOnPointerDown() {
    this.hiddenSpriteTools();
  }

  private handleSpriteOnChange(type: SpriteActionType, pixiSprite: PixiSprite, imageConfig: ImageConfig) {
    if ([SpriteActionType.DragStart, SpriteActionType.ResizeStart].includes(type)) {
      if (pixiStore.selectedUrl !== imageConfig.url) {
        pixiSprite.showTools();
        this.hiddenSpriteTools();
      }
    }
  }

  private hiddenSpriteTools(url = '') {
    if (!url) {
      pixiStore.selectedUrl = '';
      pixiStore.pixiSprites.forEach((pixiSprite) => pixiSprite.hiddenTools());
    } else {
      pixiStore.selectedUrl = url;
      pixiStore.pixiSprites.forEach((pixiSprite, key) => {
        if (key !== url) {
          pixiSprite.hiddenTools();
        }
      });
    }
  }

  get app() {
    return this.appInstance;
  }
}

export default PixiImageEditor;
