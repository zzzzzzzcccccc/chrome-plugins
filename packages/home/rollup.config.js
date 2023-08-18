const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');
const replace = require('@rollup/plugin-replace');

const extensions = ['.js', '.ts', '.tsx'];
const globals = {};

const getPlugin = () => {
  return [
    resolve({
      extensions,
    }),
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
      ],
    }),
    typescript({
      incremental: false,
    }),
    terser(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ];
};

const getUmdOutPut = ({ name, fileName, globals }) => ({
  name,
  format: 'iife',
  file: `public/chrome/${fileName}`,
  globals,
  sourcemap: true,
});

module.exports = [
  {
    input: 'src/chrome/http-intercept.ts',
    output: [
      getUmdOutPut({
        name: 'tabManagerHttpIntercept',
        fileName: 'http-intercept.js',
        globals,
      }),
    ],
    plugins: getPlugin(),
  },
  {
    input: 'src/chrome/inject.ts',
    output: [
      getUmdOutPut({
        name: 'tabManagerInject',
        fileName: 'inject.js',
        globals,
      }),
    ],
    plugins: getPlugin(),
  },
  {
    input: 'src/chrome/background.ts',
    output: [
      getUmdOutPut({
        name: 'tabManagerBackground',
        fileName: 'background.js',
        globals,
      }),
    ],
    plugins: getPlugin(),
  },
];
