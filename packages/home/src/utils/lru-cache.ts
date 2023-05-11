class LRUCache<K = string, V = any> {
  private readonly cache: Map<K, V>;

  constructor(private capacity: number, initialValue: Map<K, V> = new Map<K, V>()) {
    this.cache = initialValue;
  }

  private first() {
    return this.cache.keys().next().value;
  }

  public set(key: K, value: V) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    if (this.cache.size >= this.capacity) {
      this.cache.delete(this.first());
    }
    this.cache.set(key, value);
  }

  public get(key: K) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key) as V;
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }

  public remove(key: K) {
    this.cache.delete(key);
  }

  public keys() {
    const keys: K[] = [];
    this.cache.forEach((value, key) => keys.push(key));
    return keys;
  }

  public values() {
    const values: V[] = [];
    this.cache.forEach((value) => values.push(value));
    return values;
  }

  public toJson() {
    return Object.fromEntries(this.cache) as Record<string, V>;
  }
}

export default LRUCache;
