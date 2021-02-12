const path = require('path')
const { mdsvex } = require('mdsvex')

const isProd = process.env.NODE_ENV === 'production'
// const isPortTaken = function (port) {
//   const net = require('net')
//   const tester = net
//     .createServer()
//     .once('error', err => {
//       if (err.code !== 'EADDRINUSE') return true
//     })
//     .once('listening', () => {
//       tester.once('close', () => false).close()
//     })
//     .listen(port)
// }

// if (isProd) {
//   const app = require('express')()
//   app.use('/___graphql', require('./support/graphql/handler'))
//   try {
//     !isPortTaken && app.listen(3030)
//   } catch (error) {
//     //
//   }
// }

module.exports = {
  // extensions: ['.svelte', '.svx'],
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: '@sveltejs/adapter-static',

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
  },
  preprocess: [
    // require('svelte-preprocess')(),
    require('./support/svelte-preprocess-gql')(),
    mdsvex({
      extensions: ['.md', '.svx'],
      // layout: {
      //   _: './src/pages/_mdx.svelte',
      // },
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
