const pkg = require('./package.json')
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      name: pkg.name,
      format: 'esm',
      file: pkg.module
    },
    {
      name: pkg.name,
      format: 'cjs',
      file: pkg.cjs
    },
    {
      name: 'screenshotOcr',
      format: 'umd',
      file: pkg.umd,
      globals: {
      }
    },
  ],
  plugins: [
    commonjs(),
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: /node_modules/,
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "usage",
            corejs: 3,
            modules: false,
            targets: ["> 0.5%", "ie >= 9"],
            spec: true,
            forceAllTransforms: true,
          }
        ],
      ],
    }),
    typescript(),
    terser(),
  ]
}
