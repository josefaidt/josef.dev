import fs from 'fs'
import webpack from 'webpack'
import { builtinModules } from 'module'

const pkg = JSON.parse(fs.readFileSync(new URL('package.json', import.meta.url).pathname, 'utf-8'))

export default {
  mode: 'production',
  target: 'node',
  externals: Object.keys(pkg.devDependencies),
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
