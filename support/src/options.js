const { resolve } = require('path')

module.exports = {
  content: resolve('content'),
  api: '/___graphql',
  app: {
    title: 'Svelte App',
    url: '',
    description: 'Svelte app',
    keywords: ['svelte', 'app'],
    author: 'josefaidt',
  },
}
