import { CreateAppPayload, PixiSprites } from './types';
import PixiSprite from './pixi-sprite';

class PixiStore {
  private _configuration: CreateAppPayload | null = null;
  private _selectedUrl = '';
  private _pixiSprites: PixiSprites = new Map();

  public get configuration() {
    return this._configuration;
  }

  public set configuration(payload: CreateAppPayload | null) {
    this._configuration = payload;
  }

  public get selectedUrl() {
    return this._selectedUrl;
  }

  public set selectedUrl(url: string) {
    this._selectedUrl = url;
  }

  public get pixiSprites() {
    return this._pixiSprites;
  }

  public pushPixiSprite(url: string, pixiSprite: PixiSprite) {
    this._pixiSprites.set(url, pixiSprite);
  }

  public cleanPixiSprite() {
    this._pixiSprites.forEach((_, url) => URL.revokeObjectURL(url));
    this._pixiSprites.clear();
  }
}

const pixiStore = new PixiStore();

export default pixiStore;
