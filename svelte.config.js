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
      remarkPlugins: [
        require('remark-slug'),
        require('remark-autolink-headings'),
        require('remark-images'),
        // require('remark-prism'),
      ],
    }),
  ],
}
