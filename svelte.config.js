const path = require('path')
const { mdsvex } = require('mdsvex')

module.exports = {
  extensions: ['.svelte', '.svx'],
  preprocess: [
    require('svelte-preprocess')(),
    require('./support/svelte-preprocess-gql')(),
    mdsvex({
      layout: {
        _: './src/pages/_mdx.svelte',
      },
      smartypants: true,
      remarkPlugins: [require('remark-slug'), require('remark-autolink-headings')],
      rehypePlugins: [
        [
          require('rehype-local-image-to-cloudinary'),
          {
            baseDir: path.join(__dirname, 'static'),
            uploadFolder: 'josef.dev',
            transformations: 'q_auto,f_auto',
          },
        ],
      ],
    }),
  ],
}
