type PayloadClassOptions = {
  rootName?: string;
  tab?: string;
};

const DEFAULT_JS_KOTLIN_TYPE_MAPPER: Record<string, string> = {
  string: 'String',
  number: 'Double',
  bigint: 'Long',
  boolean: 'Boolean',
  object: 'Any',
};

class JsonToKotlin {
  static getJsonObjectKey(target: string) {
    return target[0].toUpperCase() + target.substring(1);
  }

  static createKotlinClassString(name: string, content: string) {
    return `data class ${name} (
  ${content}
)`;
  }

  public transformClass<T>(target: T, options?: PayloadClassOptions) {
    const { rootName = 'Root', tab = `  ` } = options || {};
    const classList: string[] = [];
    if (!target) {
      return JsonToKotlin.createKotlinClassString(rootName, '');
    }
    if (Array.isArray(target) && target.length) {
      const attrs = target.reduce((acc, record) => {
        acc = Array.from(new Set([...acc, ...this.getAttrsByRecord(record)]));
        return acc;
      }, [] as string[]);
      return JsonToKotlin.createKotlinClassString(rootName, attrs.join(`\n${tab}`));
    }
    const attrs = this.getAttrsByRecord(target as Record<string, any>, (key, propKey, value) => {
      classList.push(this.transformClass(value, { rootName: propKey, tab }));
    });
    classList.push(JsonToKotlin.createKotlinClassString(rootName, attrs.join(`\n${tab}`)));
    return classList.join(`\n\n`);
  }

  private getAttrsByRecord(record: Record<string, any>, callback?: (key: string, propKey: string, value: any) => void) {
    return Object.entries(record).map(([key, value]) => {
      const { isArray, isJSON } = this.isJSONObject(value);
      if (isJSON) {
        const propKey = JsonToKotlin.getJsonObjectKey(key);
        callback?.(key, propKey, value);
        return isArray ? `val ${key}: List<${propKey}>` : `val ${key}: ${propKey}`;
      } else {
        return `val ${key}: ${this.getTypeByItem(value)}`;
      }
    });
  }

  private getTypeByItem<I>(item: I): string {
    if (Array.isArray(item)) {
      if (item.length <= 0) {
        return `List<Any>?`;
      }
      const setTypes = new Set(item.map((i) => this.getTypeByItem(i)));
      if (setTypes.size === 1) {
        return `List<${setTypes.values().next().value}>`;
      } else {
        return `List<Any>`;
      }
    } else {
      const type = typeof item;
      if (type === 'number' && Number.isInteger(item)) {
        return 'Int';
      }
      return DEFAULT_JS_KOTLIN_TYPE_MAPPER[type] || 'Any';
    }
  }

  private isJSONObject<T>(target: T) {
    const isPlainJSONObject = (v: T) => typeof v === 'object' && v !== null && !Array.isArray(v);
    if (Array.isArray(target)) {
      return {
        isJSON: target.length > 0 && target.every(isPlainJSONObject),
        isArray: true,
      };
    }
    return {
      isJSON: isPlainJSONObject(target),
      isArray: false,
    };
  }
}

export default new JsonToKotlin();
