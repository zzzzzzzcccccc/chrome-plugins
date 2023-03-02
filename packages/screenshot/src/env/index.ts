const APP_ENV = '__APP_ENV__' as string;
const parseAppEnv = JSON.parse(APP_ENV);

function getEnv<T = string>(key: string) {
  return parseAppEnv[key] as T;
}

function getOcrResultUrl() {
  return getEnv('OCR_RESULT_URL');
}

export { getEnv, getOcrResultUrl };
