import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      file: pkg.main,
      name: 'd3SankeyCircular',
      format: 'umd',
      globals: ['d3-array', 'd3', 'd3-collection:d3', 'd3-shape:d3']
    },
    external: ['d3-array', 'd3', 'd3-collection', 'd3-shape'],
    plugins: [
      resolve(), // so Rollup can find `d3`
      commonjs(), // so Rollup can convert `d3` to an ES module
      babel({
        exclude: ['node_modules/**']
      })
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'es',
        name: 'd3SankeyCircular',
        globals: ['d3-array', 'd3', 'd3-collection:d3', 'd3-shape:d3']
      },
      {
        file: pkg.module,
        format: 'es',
        name: 'd3SankeyCircular',
        globals: ['d3-array', 'd3', 'd3-collection:d3', 'd3-shape:d3']
      }
    ],
    external: ['d3-array', 'd3', 'd3-collection', 'd3-shape'],

    plugins: [
      babel({
        exclude: ['node_modules/**']
      })
    ]
  }
]
