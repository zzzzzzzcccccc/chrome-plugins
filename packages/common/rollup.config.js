const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');
const pkg = require('./package.json');

const getPlugin = () => {
  return [
    commonjs(),
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
      ],
    }),
    typescript(),
    terser(),
  ];
};

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      name: pkg.name,
      format: 'cjs',
      file: pkg.main,
    },
    {
      name: pkg.name,
      format: 'es',
      file: pkg.module,
    },
  ],
  plugins: getPlugin(),
};
