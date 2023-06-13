import { json, mysql } from 'generate-schema';

type TransformSchemaPayload<T> = {
  target: T;
  mode: string;
};

export function transformToSchema<T>(payload: TransformSchemaPayload<T>) {
  const { mode, target } = payload;
  switch (mode) {
    case 'json':
      return jsonToSchema(target);
    case 'mysql':
      return jsonToMysql(target);
    default:
      return '';
  }
}

function jsonToSchema<T>(target: T) {
  return JSON.stringify(json('Root', target), null, 2);
}

function jsonToMysql<T>(target: T) {
  return mysql(target);
}
