import { resolve } from 'path'
import { readFile } from 'fs/promises'
import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'

const pkg = JSON.parse(await readFile(resolve('package.json'), 'utf-8'))

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
      routes: resolve('src/pages'),
    },

    prerender: {
      force: true,
    },

    vite: {
      // plugins: [GraphQLLayerPlugin({ app })],
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
    // preprocessGraphQL(),
  ],
}