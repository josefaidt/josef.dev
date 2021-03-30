const { resolve, extname } = require('path')
const merge = require('deepmerge')
const defaultOptions = require('./options')
const recursiveReadDir = require('./recursiveReadDir')

function log(message) {
  console.log('\x1b[1m\x1b[36m%s\x1b[0m', `${message}`)
}

const apidir = resolve('api')

// this is created to mitigate issues with client-side code not running
// when `svelte-kit dev` is wrapped with `vercel dev`
module.exports = function VercelLayerPlugin() {
  return {
    name: 'vercel-layer-plugin',
    configureServer: async server => {
      const endpoints = await recursiveReadDir(apidir, { only: ['js'] })
      for (endpoint of endpoints) {
        const handler = require(endpoint)
        const route = endpoint.replace(apidir, '/api').replace(extname(endpoint), '')
        server.middlewares.use((req, res, next) => {
          // add methods for Micro that don't exist in Node httpServer
          res.__proto__.json = payload => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(payload))
          }
          res.__proto__.status = code => {
            res.statusCode = code
            // return res to chain this call with `.json()`
            return res
          }
          next()
        })
        server.middlewares.use(route, handler?.default || handler)
      }
      log('> Vercel API Layer initialized!')
    },
  }
}
