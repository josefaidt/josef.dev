import { resolve } from 'path'
import autoprefixer from 'autoprefixer'
import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import { GraphQLLayerPlugin, preprocessGraphQL } from '@josef/graphql'
// this is needed to build locally
import dotenv from 'dotenv'
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte'],
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    // target: '#svelte',

    files: {
      assets: resolve('public'),
      routes: resolve('src/pages'),
      template: resolve(`src/app${!isProduction ? '.dev' : ''}.html`),
    },

    // prerender: {
    //   onError: 'continue',
    // },

    vite: {
      plugins: [GraphQLLayerPlugin()],
      ssr: {},
      optimizeDeps: {
        include: ['highlight.js/lib/core'],
      },
      build: {
        rollupOptions: {
          external: ['fs/promises', 'node:*'],
        },
      },
      resolve: {
        alias: {
          $components: resolve('src/components'),
          $hooks: resolve('src/hooks'),
          $icons: resolve('src/components/icons'),
          $styles: resolve('src/styles'),
          $content: resolve('content'),
        },
      },
    },
  },
  preprocess: [
    preprocess({
      postcss: {
        plugins: [autoprefixer()],
      },
    }),
    preprocessGraphQL(),
  ],
}

export default config
