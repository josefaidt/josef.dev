const { readdirSync, readFileSync, promises: fs } = require('fs')
const path = require('path')
const fm = require('front-matter')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { mdsvex } = require('mdsvex')
const appConfig = require('./app.config')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const { request } = require('graphql-request')
const recursiveReadDir = require('./support/recursiveReadDir')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

class BlogBootstrapPlugin {
  constructor(options) {
    this.options = options || {
      outFile: path.join(__dirname, 'pages/blog/_data.json'),
    }
  }
  apply(compiler) {
    compiler.hooks.watchRun.tap('BlogBootstrapPlugin', async compiler => {
      const posts = await recursiveReadDir(path.join(__dirname, 'pages/blog'))
      let data = []
      for (let post of posts) {
        // This will give you a valid svelte component
        const matter = fm(await fs.readFile(post, 'utf8'))
        data.push([post, matter.attributes])
      }
      try {
        await fs.writeFile(this.options.outFile, JSON.stringify(data), 'utf8')
      } catch (error) {
        throw error
      }
    })
  }
}

class GraphQLLayerPlugin {
  constructor(options) {
    //
    this.app = require('express')()
    this.server
  }
  apply(compiler) {
    compiler.hooks.beforeRun.tap('GraphQLLayerPlugin', async compiler => {
      this.app.use(
        '/___graphql',
        graphqlHTTP({
          schema: buildSchema(readFileSync(path.join(__dirname, 'support/graphql/schema.graphql'), 'utf8')),
          rootValue: require('./support/graphql/resolvers'),
          graphiql: true,
        })
      )
      this.server = this.app.listen(3000)
    })
    compiler.hooks.done.tap('GraphQLLayerPlugin', async compiler => {
      this.server.close()
    })
  }
}

const plugins = [
  new BlogBootstrapPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].css',
  }),
]

module.exports = {
  entry: {
    bundle: ['./main.js'],
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte', '.svx', '.css'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: appConfig.basePath || '/',
  },
  module: {
    rules: [
      {
        test: /\.(svelte|svx)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            dev: !prod,
            hydratable: false,
            hotReload: true,
            preprocess: [
              {
                script: async ({ content }) => {
                  const acorn = require('acorn')
                  const walk = require('acorn-walk')
                  const tree = acorn.parse(content, { sourceType: 'module', ecmaVersion: '2020' })
                  let start, end

                  walk.simple(tree, {
                    VariableDeclaration(node) {
                      const [declaration] = node.declarations
                      if (declaration.id.name === 'query') {
                        start = declaration.init.start
                        end = declaration.init.end
                      }
                    },
                  })

                  if (!start) return { code: content }

                  const query = content.slice(start, end)

                  let data
                  try {
                    data = await request('http://localhost:3000/___graphql', query.slice(1, -1))
                  } catch (error) {
                    throw new Error(`There was an error requesting data\n${error}`)
                  }

                  return { code: content.replace(query, JSON.stringify(data)) }
                },
              },
              mdsvex({
                layout: {
                  _: './pages/_mdx.svelte',
                },
                remarkPlugins: [require('remark-autolink-headings')],
              }),
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  mode,
  plugins: prod ? plugins.concat(new GraphQLLayerPlugin()) : plugins,
  devtool: prod ? false : 'source-map',
  devServer: {
    before: function (app, server, compiler) {
      app.use(
        '/___graphql',
        graphqlHTTP({
          schema: buildSchema(readFileSync(path.join(__dirname, 'support/graphql/schema.graphql'), 'utf8')),
          rootValue: require('./support/graphql/resolvers'),
          graphiql: true,
        })
      )
    },
    port: 3000,
    historyApiFallback: {
      index: 'index.html',
    },
    watchOptions: {
      ignored: [path.join(__dirname, 'pages/blog/_data.json')],
    },
  },
}
