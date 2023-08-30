import * as PIXI from 'pixi.js';
import { ImageConfig, SpriteActionType } from './types';
import PixiSprite from './pixi-sprite';

type PointerEventType = 'pointermove' | 'pointerup' | 'pointerupOutside';

class PixiImageEditor {
  private images = new Map<string, ImageConfig>();
  private pixiSprites = new Map<string, PixiSprite>();
  private appInstance: PIXI.Application | null = null;
  private onPointerEventCallbacks = new Map<PointerEventType, Set<(event: PIXI.FederatedPointerEvent) => void>>();
  private selectedUrl = '';

  public createApp() {
    if (!this.appInstance) {
      this.appInstance = new PIXI.Application({
        resizeTo: window,
        background: 'transparent',
      });
    }
    this.appInstance.stage.interactive = true;
    this.appInstance.stage.hitArea = this.appInstance.screen;
    this.addListener();
    return this.appInstance;
  }

  public destroy() {
    if (this.appInstance) {
      this.removeListener();
      this.appInstance.destroy(true);
      this.appInstance = null;
      this.selectedUrl = '';
      this.cleanPixiSprite();
    }
  }

  public addImage(payload: ImageConfig) {
    this.images.set(payload.url, payload);

    const pixiSprite = new PixiSprite(payload, (type, instance) => this.handleSpriteOnChange(type, instance, payload));

    this.addPixiSprite(payload.url, pixiSprite);
    this.hiddenSpriteOtherTools(payload.url);
    this.selectedUrl = payload.url;
    this.appInstance?.stage.addChild(pixiSprite.container);

    this.addPointerEventCallback('pointermove', (event) => pixiSprite.handleOnPointermove(event));
    this.addPointerEventCallback('pointerup', (event) => pixiSprite.handleOnPointermoveEnd(event));
    this.addPointerEventCallback('pointerupOutside', (event) => pixiSprite.handleOnPointermoveEnd(event));

    this.addPointerEventCallback('pointermove', (event) => pixiSprite.handleOnResizeButtonPointermove(event));
    this.addPointerEventCallback('pointerup', (event) => pixiSprite.handleOnResizeButtonPointermoveEnd(event));
    this.addPointerEventCallback('pointerupOutside', (event) => pixiSprite.handleOnResizeButtonPointermoveEnd(event));
  }

  public cleanImages() {
    this.images.clear();
    this.removeListener();
    this.appInstance?.stage.removeChildren();
    this.selectedUrl = '';
    this.cleanPixiSprite();
  }

  private addPixiSprite(url: string, pixiSprite: PixiSprite) {
    this.pixiSprites.set(url, pixiSprite);
  }

  private cleanPixiSprite() {
    this.pixiSprites.clear();
  }

  private addListener() {
    this.appInstance?.stage.on('pointermove', (event) => this.handleOnPointermove(event));
    this.appInstance?.stage.on('pointerup', (event) => this.handleOnPointerup(event));
    this.appInstance?.stage.on('pointerupoutside', (event) => this.handleOnPointerupOutside(event));
  }

  private removeListener() {
    this.appInstance?.stage.off('pointermove', (event) => this.handleOnPointermove(event));
    this.appInstance?.stage.off('pointerup', (event) => this.handleOnPointerup(event));
    this.appInstance?.stage.off('pointerupoutside', (event) => this.handleOnPointerupOutside(event));
    this.removeAllPointerEventCallbacks();
  }

  private addPointerEventCallback(eventType: PointerEventType, callback: (event: PIXI.FederatedPointerEvent) => void) {
    if (!this.onPointerEventCallbacks.has(eventType)) {
      this.onPointerEventCallbacks.set(eventType, new Set());
    }
    this.onPointerEventCallbacks.get(eventType)?.add(callback);
  }

  private removeAllPointerEventCallbacks() {
    this.onPointerEventCallbacks.clear();
  }

  private handleOnPointermove(event: PIXI.FederatedPointerEvent) {
    this.onPointerEventCallbacks.get('pointermove')?.forEach((callback) => callback(event));
  }

  private handleOnPointerup(event: PIXI.FederatedPointerEvent) {
    this.onPointerEventCallbacks.get('pointerup')?.forEach((callback) => callback(event));
  }

  private handleOnPointerupOutside(event: PIXI.FederatedPointerEvent) {
    this.onPointerEventCallbacks.get('pointerupOutside')?.forEach((callback) => callback(event));
  }

  private handleSpriteOnChange(type: SpriteActionType, pixiSprite: PixiSprite, imageConfig: ImageConfig) {
    if (type === SpriteActionType.PointerDown) {
      if (this.selectedUrl === imageConfig.url) {
        this.selectedUrl = '';
        pixiSprite.hiddenTools();
      } else {
        this.selectedUrl = imageConfig.url;
        pixiSprite.drawTools();
        this.hiddenSpriteOtherTools(imageConfig.url);
      }
    }
  }

  private hiddenSpriteOtherTools(url: string) {
    this.pixiSprites.forEach((pixiSprite, key) => {
      if (key !== url) {
        pixiSprite.hiddenTools();
      }
    });
  }
}

export default PixiImageEditor;
