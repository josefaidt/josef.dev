import { resolve } from 'path'
import merge from 'deepmerge'
import express from 'express'
import handler from './handler'
import defaultOptions from './options'

function log(message) {
  console.log('\x1b[1m\x1b[36m%s\x1b[0m', `${message}`)
}

const isProd = process.env.NODE_ENV === 'production'

export function GraphQLLayerPlugin(pluginOptions = {}) {
  const options = merge(defaultOptions, pluginOptions)
  const route = options.api
  const initMessage = '> GraphQL layer initialization'

  let initialized = false
  let layer = isProd && express()
  let server
  return {
    name: 'graphql-layer-plugin',
    options: async config => {
      if (!initialized && !isProd) {
        // log('> Initializing GraphQL layer...')
        initialized = true
        log('> GraphQL layer initialized!')
      }
      // if (isProd && !server) {
      //   layer.use(route, handler)
      //   server = layer.listen(3000, () => log('> Production layer listening...'))
      // }
      return config
    },
    configureServer: async server => {
      server.middlewares.use(route, handler)
    },
    buildEnd: error => {
      // ends after client and SSR build steps
      if (error) throw error
      // if (server) server.close()
    },
    closeBundle: () => {
      // closes after client and SSR build steps
    },
  }
}