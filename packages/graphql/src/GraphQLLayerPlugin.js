import options from '@josef/options'
import handler from './handler'

function log(message) {
  console.log('\x1b[1m\x1b[36m%s\x1b[0m', `${message}`)
}

const isProd = process.env.NODE_ENV === 'production'

export function GraphQLLayerPlugin(pluginOptions = {}) {
  const route = options.api

  let initialized = false
  return {
    name: 'graphql-layer-plugin',
    options: async config => {
      if (!initialized && !isProd) {
        initialized = true
        log('> GraphQL layer initialized!')
      }
      return config
    },
    configureServer: async server => {
      server.middlewares.use(route, handler)
    },
  }
}
