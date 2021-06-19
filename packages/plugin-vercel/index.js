import { resolve, extname } from 'path'
import glob from 'fast-glob'

function log(message) {
  console.log('\x1b[1m\x1b[36m%s\x1b[0m', `${message}`)
}

const apidir = resolve('api')

// this is created to mitigate issues with client-side code not running
// when `svelte-kit dev` is wrapped with `vercel dev`
export default function VercelLayerPlugin() {
  return {
    name: 'vercel-layer-plugin',
    configureServer: async server => {
      // attach helpers to serverResponse for Vercel's serverless functions
      server.middlewares.use((req, res, next) => {
        res.__proto__.json = function json(payload) {
          this.setHeader('Content-Type', 'application/json')
          this.end(JSON.stringify(payload))
        }
        res.__proto__.status = function status(code) {
          this.statusCode = code
          return this
        }
        next()
      })

      // read endpoint file paths
      const endpoints = await glob('**/[!_]*.js', {
        cwd: apidir,
        absolute: true,
      })
      for (let endpoint of endpoints) {
        const handler = await import(endpoint)
        // create api route from full file path
        const route = endpoint
          .replace(apidir, '/api')
          .replace(extname(endpoint), '')
        server.middlewares.use(route, handler?.default || handler)
      }
      log(`> Vercel API Layer initialized! ${endpoints.length} routes added`)
    },
  }
}
