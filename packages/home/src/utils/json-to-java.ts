type PayloadClassOptions = {
  rootName?: string;
  tab?: string;
};

const DEFAULT_JS_JAVA_TYPE_MAPPER: Record<string, string> = {
  string: 'String',
  number: 'Double',
  bigint: 'Long',
  boolean: 'Boolean',
  object: 'Object',
};

class JsonToJava {
  static getJsonObjectKey(target: string) {
    return target.charAt(0).toUpperCase() + target.slice(1);
  }

  static createJavaClassString(name: string, content: string) {
    return `public class ${name} {
  ${content}
};`;
  }

  public transformClass<T>(target: T, options?: PayloadClassOptions) {
    const { rootName = 'Root', tab = `  ` } = options || {};
    const classList: string[] = [];
    if (!target) {
      return JsonToJava.createJavaClassString(rootName, '');
    }
    if (Array.isArray(target) && target.length) {
      const attrs = target.reduce((acc, record) => {
        acc = Array.from(new Set([...acc, ...this.getAttrsByRecord(record)]));
        return acc;
      }, [] as string[]);
      return JsonToJava.createJavaClassString(rootName, attrs.join(`\n${tab}`));
    }
    const attrs = this.getAttrsByRecord(target as Record<string, any>, (key, propKey, value) => {
      classList.push(this.transformClass(value, { rootName: propKey, tab }));
    });
    classList.push(JsonToJava.createJavaClassString(rootName, attrs.join(`\n${tab}`)));
    return classList.join(`\n\n`);
  }

  private getAttrsByRecord(record: Record<string, any>, callback?: (key: string, propKey: string, value: any) => void) {
    return Object.entries(record).map(([key, value]) => {
      const { isArray, isJSON } = this.isJSONObject(value);
      if (isJSON) {
        const propKey = JsonToJava.getJsonObjectKey(key);
        callback?.(key, propKey, value);
        return isArray ? `private List<${propKey}> ${key};` : `private ${propKey} ${key};`;
      } else {
        return `private ${this.getTypeByItem(value)} ${key};`;
      }
    });
  }

  private getTypeByItem<I>(item: I): string {
    if (Array.isArray(item)) {
      if (item.length <= 0) {
        return `List<Object>`;
      }
      const setTypes = new Set(item.map((i) => this.getTypeByItem(i)));
      if (setTypes.size === 1) {
        return `List<${setTypes.values().next().value}>`;
      } else {
        return `List<Object>`;
      }
    } else {
      const type = typeof item;
      if (type === 'number' && Number.isInteger(item)) {
        return 'Int';
      }
      return DEFAULT_JS_JAVA_TYPE_MAPPER[type] || 'Object';
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

export default new JsonToJava();
