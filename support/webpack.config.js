import webpack from 'webpack'
import { builtinModules } from 'module'

export default {
  mode: 'production',
  target: 'node',
  resolve: {
    fallback: Object.fromEntries(builtinModules.map(mod => [mod, false])),
  },
  entry: {
    'snowpack-plugin-gql': './snowpack-plugin-gql.js',
    'svelte-preprocess-gql': './svelte-preprocess-gql.js',
  },
  output: {
    filename: '[name].cjs',
    libraryTarget: 'commonjs',
    path: new URL('./cjs', import.meta.url).pathname,
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
        exclude: /node_modules/,
      },
    ],
  },
}
