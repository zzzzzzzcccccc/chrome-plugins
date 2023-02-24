import { getQueryVariable } from '@chrome-plugin/common';
import ocrResult from './ocr-result';

const url = getQueryVariable('url') || '';
const width = +getQueryVariable('width') || 0;
const height = +getQueryVariable('height') || 0;

ocrResult.create({
  url,
  width,
  height,
});
