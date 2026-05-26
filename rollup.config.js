import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from '@rollup/plugin-terser';

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

const outputFile = isProd
  ? 'build/guppy.min.js'
  : isTest
  ? 'build/guppy-test.js'
  : 'build/guppy.js';

export default {
  input: 'src/guppy.js',
  output: {
    name: 'Guppy',
    file: outputFile,
    format: 'umd',
    exports: 'default'
  },
  plugins: [
    commonjs({
      include: ['lib/mousetrap/**', 'lib/katex/**'],
      requireReturnsDefault: 'auto'
    }),
    json({
      include: ['sym/**']
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    ...(isProd ? [terser()] : [])
  ]
};
