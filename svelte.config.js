import { resolve } from 'path'
import { readFile } from 'fs/promises'
import autoprefixer from 'autoprefixer'
import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import { GraphQLLayerPlugin, preprocessGraphQL } from '@josef/graphql'
import VercelLayerPlugin from '@josef/plugin-vercel'

// https://nodejs.org/api/esm.html#esm_no_json_module_loading
const pkg = JSON.parse(await readFile(resolve('package.json'), 'utf-8'))
const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('@sveltejs/kit').Config} */
export default {
  extensions: ['.svelte', '.md'],
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',

    files: {
      assets: resolve('public'),
      routes: resolve('src/pages'),
      template: resolve(`src/app${!isProduction ? '.dev' : ''}.html`),
    },

    prerender: {
      onError: 'continue',
    },

    vite: {
      plugins: [GraphQLLayerPlugin(), VercelLayerPlugin()],
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
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
