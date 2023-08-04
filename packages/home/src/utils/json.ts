import { json, mysql, generic, mongoose, bigquery } from 'generate-schema';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import { quicktype, jsonInputForTargetLanguage, InputData } from 'quicktype-core';

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
    case 'generic':
      return jsonToGeneric(target);
    case 'mongoose':
      return jsonToMongoose(target);
    case 'bigquery':
      return jsonToBigquery(target);
    case 'graphql':
      return jsonToGraphql(target);
    default:
      return quickTypeJSON(mode, 'Root', JSON.stringify(target));
  }
}

function jsonToSchema<T>(target: T) {
  return JSON.stringify(json('Root', target), null, 2);
}

function jsonToMysql<T>(target: T) {
  return mysql(target);
}

function jsonToGeneric<T>(target: T) {
  return JSON.stringify(generic(target), null, 2);
}

function jsonToMongoose<T>(target: T) {
  return JSON.stringify(mongoose(target), null, 2);
}

function jsonToBigquery<T>(target: T) {
  return JSON.stringify(bigquery(target), null, 2);
}

function jsonToGraphql<T>(target: T) {
  return jsonToGraphQLQuery({ query: target }, { pretty: true });
}

async function quickTypeJSON(targetLanguage: string, typeName: string, jsonString: string) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);
  const inputData = new InputData();

  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  inputData.addInput(jsonInput);

  const result = await quicktype({
    inputData,
    lang: targetLanguage,
  });

  return result.lines.join('\n');
}
