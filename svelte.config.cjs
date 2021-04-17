const { resolve } = require('path')
const { mdsvex } = require('mdsvex')
const adapter = require('@sveltejs/adapter-vercel')
// const app = require('./app.config.cjs')
const pkg = require('./package.json')

const mdsvexConfig = {
  extensions: ['.svx', '.md'],
  smartypants: {
    dashes: 'oldschool',
  },
  layout: {
    _: resolve("src/pages/posts/$layout.svelte"),
  },
  remarkPlugins: [
    [
      require('remark-github'),
      {
        // Use your own repository
        repository: 'https://github.com/josefaidt/josef.dev.git',
      },
    ],
    require('remark-abbr'),
  ],
  rehypePlugins: [
    require('rehype-slug'),
    [
      require('rehype-autolink-headings'),
      {
        behavior: 'wrap',
      },
    ],
    require('rehype-format'),
    [
      require('rehype-local-image-to-cloudinary'),
      {
        baseDir: resolve('src/pages/posts/images'),
        uploadFolder: 'josef.dev',
        transformations: 'q_auto,f_auto',
      },
    ],
  ],
}

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
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
      plugins: [require('@rollup/plugin-dynamic-import-vars')],
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
    mdsvex(mdsvexConfig),
    require('svelte-preprocess')({
      postcss: {
        plugins: [require('autoprefixer')()],
      },
    }),
    // preprocessGraphQL(),
  ],
}
