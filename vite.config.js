const svite = require('svite')
const sviteConfig = {
  // hot: true, // boolean or options object for svelte-hmr
  // useTransformCache: false, // boolean
}

module.exports = {
  proxy: {
    '/___graphql': `http://localhost:3005/___graphql`,
  },
  plugins: [svite(sviteConfig)],
  optimizeDeps: {
    exclude: ['@roxi/routify'],
  },
}
