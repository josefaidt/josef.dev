import { resolve } from 'path'
import { readFile } from 'fs/promises'
import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import { GraphQLLayerPlugin, preprocessGraphQL } from '@josef/graphql'
import autoprefixer from 'autoprefixer'

const pkg = JSON.parse(await readFile(resolve('package.json'), 'utf-8'))
const isProduction = process.env.NODE_ENV === 'production'

export const app = {
  title: 'josef',
  url: 'https://josef.dev',
  description: 'Welcome to my personal site',
  keywords: ['josef', 'aidt', 'personal', 'portfolio', 'svelte'],
  author: 'Josef Aidt',
  handle: 'josefaidt',
}

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
    },

    prerender: {
      force: true,
    },

    vite: {
      plugins: [GraphQLLayerPlugin({ app })],
      // plugins: [require('@rollup/plugin-dynamic-import-vars')],
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
      build: {
        rollupOptions: {
          input: {
            app: resolve(`src/pages/app${!isProduction ? '.dev' : ''}.html`),
          },
        },
      },
    },
  },
  preprocess: [
    // mdsvex(mdsvexConfig),
    // markdown(),
    preprocess({
      postcss: {
        plugins: [autoprefixer()],
      },
    }),
    preprocessGraphQL(),
  ],
}
