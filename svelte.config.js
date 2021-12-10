import { join, resolve } from 'path'
import { readFile } from 'fs/promises'
import autoprefixer from 'autoprefixer'
import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import { GraphQLLayerPlugin, preprocessGraphQL } from '@josef/graphql'
import VercelLayerPlugin from '@josef/plugin-vercel'

const isProduction = process.env.NODE_ENV === 'production'

async function read(file) {
  return await readFile(new URL(file, import.meta.url), 'utf-8')
}

async function getDependencies(modulePath) {
  const modulePackageJson = join(modulePath, 'package.json')
  return (
    Object.keys(JSON.parse(await read(modulePackageJson)).dependencies) || {}
  )
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
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

    ssr: false,

    vite: {
      plugins: [GraphQLLayerPlugin(), VercelLayerPlugin()],
      // ssr: {
      //   external: ['node:*'],
      // },
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
