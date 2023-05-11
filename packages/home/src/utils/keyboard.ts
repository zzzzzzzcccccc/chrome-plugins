export type KeyCode = ['ctrl' | 'shift' | 'alt' | 'meta', string] | string;

export interface KeyboardOptions {
  eventName: 'keydown' | 'keyup';
  keyCodes: KeyCode[];
}

const defaultKeyboard = {
  ctrl: 'ctrlKey',
  shift: 'shiftKey',
  alt: 'altKey',
  meta: 'metaKey',
};

class Keyboard<Element extends HTMLElement> {
  private handlers: ((keyCode: KeyCode, event: KeyboardEvent) => void)[] = [];

  constructor(private target: Element, private options: KeyboardOptions) {}

  private emit(keyCode: KeyCode, event: KeyboardEvent) {
    this.handlers.forEach((cb) => cb(keyCode, event));
  }

  private getKeyCode(event: KeyboardEvent) {
    const { keyCodes } = this.options;
    const len = keyCodes.length;
    let result: KeyCode | null = null;

    for (let i = 0; i < len; i++) {
      const keyCode = keyCodes[i];
      if (Array.isArray(keyCode)) {
        const [defaultKey, key] = keyCode;
        const hasDefaultKeyboard = defaultKeyboard[defaultKey];
        // @ts-ignore
        if (event[hasDefaultKeyboard] && event.key === key) {
          result = keyCode;
          break;
        }
      } else {
        if (event.key === keyCode) {
          result = keyCode;
          break;
        }
      }
    }

    return result;
  }

  private listener(event: KeyboardEvent) {
    const keyCode = this.getKeyCode(event);
    if (keyCode) {
      this.emit(keyCode, event);
    }
  }

  public add(cb: (keyCode: KeyCode, event: KeyboardEvent) => void) {
    this.handlers.push(cb);
  }

  public remove(cb: (keyCode: KeyCode, event: KeyboardEvent) => void) {
    const index = this.handlers.indexOf(cb);
    if (index !== -1) {
      this.handlers.splice(index, 1);
    }
  }

  public start() {
    const { eventName } = this.options;
    this.target.addEventListener(eventName, (event) => this.listener(event));
  }

  public stop() {
    const { eventName } = this.options;
    this.target.removeEventListener(eventName, (event) => this.listener(event));
    this.handlers = [];
  }
}

export default Keyboard;
