import * as PIXI from 'pixi.js';
import { PointerEventType } from './types';

class PixiStageEvent {
  private downCallbacks = new Set<(event: PIXI.FederatedPointerEvent) => void>();
  private moveCallbacks = new Set<(event: PIXI.FederatedPointerEvent) => void>();
  private upCallbacks = new Set<(event: PIXI.FederatedPointerEvent) => void>();
  private upOutsideCallbacks = new Set<(event: PIXI.FederatedPointerEvent) => void>();

  constructor(private readonly stage: PIXI.Container) {
    this.stage.interactive = true;
    this.on();
  }

  public on() {
    this.stage.on('pointerdown', (event) => this.handleOnPointerdown(event));
    this.stage.on('pointermove', (event) => this.handleOnPointermove(event));
    this.stage.on('pointerup', (event) => this.handleOnPointerup(event));
    this.stage.on('pointerupoutside', (event) => this.handleOnPointerupOutside(event));
  }

  public off() {
    this.stage.off('pointerdown', (event) => this.handleOnPointerdown(event));
    this.stage.off('pointermove', (event) => this.handleOnPointermove(event));
    this.stage.off('pointerup', (event) => this.handleOnPointerup(event));
    this.stage.off('pointerupoutside', (event) => this.handleOnPointerupOutside(event));
    this.cleanCallbacks();
  }

  public push(eventType: PointerEventType, callback: (event: PIXI.FederatedPointerEvent) => void) {
    switch (eventType) {
      case 'pointerdown':
        this.downCallbacks.add(callback);
        break;
      case 'pointermove':
        this.moveCallbacks.add(callback);
        break;
      case 'pointerup':
        this.upCallbacks.add(callback);
        break;
      case 'pointerupOutside':
        this.upOutsideCallbacks.add(callback);
        break;
    }
  }

  public remove(eventType: PointerEventType, callback: (event: PIXI.FederatedPointerEvent) => void) {
    switch (eventType) {
      case 'pointerdown':
        this.downCallbacks.delete(callback);
        break;
      case 'pointermove':
        this.moveCallbacks.delete(callback);
        break;
      case 'pointerup':
        this.upCallbacks.delete(callback);
        break;
      case 'pointerupOutside':
        this.upOutsideCallbacks.delete(callback);
        break;
    }
  }

  public cleanCallbacks(types: PointerEventType[] = []) {
    if (types.length) {
      types.forEach((type) => {
        switch (type) {
          case 'pointerdown':
            this.downCallbacks.clear();
            break;
          case 'pointermove':
            this.moveCallbacks.clear();
            break;
          case 'pointerup':
            this.upCallbacks.clear();
            break;
          case 'pointerupOutside':
            this.upOutsideCallbacks.clear();
            break;
        }
      });
    } else {
      this.downCallbacks.clear();
      this.moveCallbacks.clear();
      this.upCallbacks.clear();
      this.upOutsideCallbacks.clear();
    }
  }

  private handleOnPointerdown(event: PIXI.FederatedPointerEvent) {
    this.downCallbacks.forEach((callback) => callback(event));
  }

  private handleOnPointermove(event: PIXI.FederatedPointerEvent) {
    this.moveCallbacks.forEach((callback) => callback(event));
  }

  private handleOnPointerup(event: PIXI.FederatedPointerEvent) {
    this.upCallbacks.forEach((callback) => callback(event));
  }

  private handleOnPointerupOutside(event: PIXI.FederatedPointerEvent) {
    this.upOutsideCallbacks.forEach((callback) => callback(event));
  }
}

export default PixiStageEvent;
