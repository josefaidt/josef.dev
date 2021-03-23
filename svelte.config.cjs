const static = require('@sveltejs/adapter-static')
const pkg = require('./package.json')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const app = require('./app.config.cjs')
const { createRequire } = require('module')
const { GraphQLLayerPlugin } = require('support')

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: static(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    vite: {
      port: 9000,
      plugins: [GraphQLLayerPlugin()],
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
      resolve: {
        alias: {
          $components: resolve('src/components'),
          $hooks: resolve('src/hooks'),
          $icons: resolve('src/components/icons'),
          $styles: resolve('src/styles'),
        },
      },
    },
  },
}
