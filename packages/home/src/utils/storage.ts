type OnError = (e: unknown) => void;

class Storage {
  public set<V = string>(key: string, value: V, onError?: OnError) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      onError?.(e);
    }
  }

  public get<V = string>(key: string, onError?: OnError) {
    try {
      const sessionData = localStorage.getItem(key);
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
      sessionStorage.removeItem(key);
    } catch (e) {
      onError?.(e);
    }
  }
}

export default new Storage();
