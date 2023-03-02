const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');
const replace = require('@rollup/plugin-replace');

const isPRD = process.env.NODE_ENV === 'production';
const globals = {
  React: 'react',
  reactDOM: 'react-dom/client',
  styled: 'styled-components',
};

const getPlugin = () => {
  return [
    resolve({ browser: true }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: /node_modules/,
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
            modules: false,
            targets: ['> 0.5%', 'ie >= 11'],
            spec: true,
            forceAllTransforms: true,
          },
        ],
        '@babel/preset-react',
      ],
    }),
    typescript(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        __APP_ENV__: process.env.APP_ENV,
      },
    }),
    isPRD ? terser() : undefined,
  ].filter(Boolean);
};

const getUmdOutPut = ({ name, fileName, globals }) => ({
  name,
  format: 'iife',
  file: `public/js/${fileName}`,
  globals,
  sourcemap: !isPRD,
});

module.exports = [
  {
    input: 'src/popup/index.ts',
    output: [
      getUmdOutPut({
        name: 'screenshotOcrPopup',
        fileName: 'popup.js',
        globals,
      }),
    ],
    plugins: getPlugin(),
  },
  {
    input: 'src/inject/index.ts',
    output: [
      getUmdOutPut({
        name: 'screenshotOcrInject',
        fileName: 'inject.js',
        globals,
      }),
    ],
    plugins: getPlugin(),
  },
  {
    input: 'src/background/index.ts',
    output: [
      getUmdOutPut({
        name: 'screenshotOcrBackground',
        fileName: 'background.js',
        globals,
      }),
    ],
    plugins: getPlugin(),
  },
];
