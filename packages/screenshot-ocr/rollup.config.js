const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');
const replace = require('@rollup/plugin-replace');

const getPlugin = () => {
  return [
    commonjs({ sourceMap: true }),
    resolve(),
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
    terser(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
    }),
  ];
};

const getUmdOutPut = ({ name, fileName, globals }) => ({
  name,
  format: 'umd',
  file: `public/bundler/${fileName}`,
  globals,
});

module.exports = [
  {
    input: 'src/popup/index.ts',
    output: [
      getUmdOutPut({
        name: 'screenshotOcrPopup',
        fileName: 'popup.js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          styled: 'styled-components',
        },
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
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          styled: 'styled-components',
        },
      }),
    ],
    plugins: getPlugin(),
  },
];
