import less from 'less';
import { BASE_SASS_LIB_WORKER_URL } from '../constants';

type SassCompileResult = {
  status: number;
  text?: string;
  message?: string;
};
type SassCompileOptions = {
  style?: number;
  precision?: number;
  comments?: boolean;
  indent?: string;
  linefeed?: string;
};
type ISass = {
  compile: (target: string, options: SassCompileOptions, callback: (result: SassCompileResult) => void) => void;
};

let sass: ISass | null = null;

type TransformToCssPayload = {
  target: string;
  mode: string;
  inline?: boolean;
};

export function transformToCss(payload: TransformToCssPayload) {
  const { mode, ...options } = payload;
  switch (mode) {
    case 'less':
      return lessToCss(options);
    case 'sass':
      return sassToCss(options);
    default:
      return '';
  }
}

function lessToCss({ target, inline = false }: Omit<TransformToCssPayload, 'mode'>) {
  return new Promise<string>((resolve, reject) => {
    less.render(target, { compress: inline }, (error, output) => {
      if (!error) {
        resolve(output?.css || '');
      } else {
        reject(error);
      }
    });
  });
}

function sassToCss({ target, inline = false }: Omit<TransformToCssPayload, 'mode'>) {
  if (!sass) {
    const Sass = (window as any).Sass;
    sass = new Sass(BASE_SASS_LIB_WORKER_URL);
  }
  return new Promise<string>((resolve, reject) => {
    sass?.compile(target, { style: inline ? 3 : 1 }, (result) => {
      if (result?.status === 0) {
        const value = result?.text || '';
        resolve(value.replace(/^\s*[\r\n]/gm, ''));
      } else {
        reject(new Error(result?.message || 'sass compile error'));
      }
    });
  });
}
