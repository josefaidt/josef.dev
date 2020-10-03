import fs from 'fs'
import path from 'path'
import { buildSchema } from 'graphql'
import Koa from 'koa'
import mount from 'koa-mount'
import graphqlHTTP from 'koa-graphql'
import svite from 'svite'
const sviteConfig = {
  // hot: true, // boolean or options object for svelte-hmr
  // useTransformCache: false, // boolean
}

// graphql route & handler
const [route, handler] = [
  '/___graphql',
  graphqlHTTP({
    schema: buildSchema(fs.readFileSync(path.join(__dirname, 'support/graphql/schema.graphql'), 'utf8')),
    rootValue: require('./support/graphql/resolvers'),
    graphiql: true,
  }),
]

function GraphQLLayerPlugin({
  root, // project root directory, absolute path
  app, // Koa app instance
  server, // raw http server instance
  watcher, // chokidar file watcher instance
}) {
  app.use(mount(route, handler))
}

if (process.env.NODE_ENV === 'production') {
  // run GraphQL Layer on build
  const app = new Koa()
  app.use(mount(route, handler))
  app.listen(process.env.PORT || 3000)
}

export default {
  // add graphql layer to dev server
  configureServer: [GraphQLLayerPlugin],
  plugins: [svite(sviteConfig)],
  optimizeDeps: {
    exclude: ['@roxi/routify'],
  },
}
