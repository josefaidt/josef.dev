const path = require('path')

module.exports = {
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: '@sveltejs/adapter-static',

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
  },
  preprocess: [
    require('svelte-preprocess')({
      postcss: {
        plugins: [require('autoprefixer')()],
      },
    }),
    require('./support/svelte-preprocess-gql')(),
    // mdsvex({
    //   extensions: ['.md', '.svx'],
    //   // layout: {
    //   //   _: './src/pages/_mdx.svelte',
    //   // },
    //   smartypants: true,
    //   remarkPlugins: [require('remark-slug'), require('remark-autolink-headings')],
    //   rehypePlugins: [
    //     [
    //       require('rehype-local-image-to-cloudinary'),
    //       {
    //         baseDir: path.join(__dirname, 'static'),
    //         uploadFolder: 'josef.dev',
    //         transformations: 'q_auto,f_auto',
    //       },
    //     ],
    //   ],
    // }),
  ],
}
