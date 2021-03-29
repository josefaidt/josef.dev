const { resolve } = require('path')
const static = require('@sveltejs/adapter-static')
const { GraphQLLayerPlugin, preprocessGraphQL } = require('support')
const app = require('./app.config.cjs')
const pkg = require('./package.json')

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: static(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    files: {
      routes: resolve('src/pages'),
    },

    vite: {
      plugins: [GraphQLLayerPlugin({ app })],
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
  preprocess: [
    require('svelte-preprocess')({
      postcss: {
        plugins: [require('autoprefixer')()],
      },
    }),
    preprocessGraphQL(),
  ],
}
