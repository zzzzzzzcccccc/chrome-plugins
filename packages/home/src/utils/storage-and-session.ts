type OnError = (e: unknown) => void;

class StorageAndSession {
  constructor(private readonly storage: Storage) {}

  public set<V>(key: string, value: V, onError?: OnError) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      onError?.(e);
    }
  }

  public get<V>(key: string, onError?: OnError) {
    try {
      const sessionData = this.storage.getItem(key);
      if (sessionData) {
        return JSON.parse(sessionData) as V;
      }
      return undefined;
    } catch (e) {
      onError?.(e);
      return undefined;
    }
  }

  public remove(key: string, onError?: OnError) {
    try {
      this.storage.removeItem(key);
    } catch (e) {
      onError?.(e);
    }
  }
}

const storage = new StorageAndSession(global.localStorage);
const session = new StorageAndSession(global.sessionStorage);

export { StorageAndSession, storage, session };
