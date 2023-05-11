import LRUCache from './lru-cache';
import formatString from './format-string';
import storage from './storage';
import Keyboard from './keyboard';
import getPlatform from './get-platform';
import buildSearchUrlByKeyword from './build-search-url-by-keyword';
import { createLink } from './link';
import { createFileInput } from './input';
import formatFileSize from './format-file-size';

export type { KeyCode, KeyboardOptions } from './keyboard';
export type { FileInputOptions } from './input';

export {
  LRUCache,
  formatString,
  storage,
  Keyboard,
  getPlatform,
  buildSearchUrlByKeyword,
  createLink,
  createFileInput,
  formatFileSize,
};
