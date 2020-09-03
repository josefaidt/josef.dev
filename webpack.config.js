const { readdirSync, readFileSync, promises: fs } = require('fs')
const path = require('path')
const fm = require('front-matter')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { mdsvex } = require('mdsvex')
const appConfig = require('./app.config')
const { request } = require('graphql-request')
const recursiveReadDir = require('./support/recursiveReadDir')
const EphemeralGraphQLLayerPlugin = require('./support/webpack/ephemeralGraphQLLayerPlugin')
const { PORT } = require('./support/webpack/config')

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

const plugins = [
  // new BlogBootstrapPlugin(),
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
            hydratable: true,
            hotReload: true,
            preprocess: [
              require('./support/svelte-preprocess-gql')(),
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
  plugins: prod ? plugins.concat(new EphemeralGraphQLLayerPlugin()) : plugins,
  devtool: prod ? false : 'source-map',
  devServer: {
    before: function (app, server, compiler) {
      app.use('/___graphql', require('./support/graphql/handler'))
    },
    port: PORT,
    historyApiFallback: {
      index: 'index.html',
    },
    watchOptions: {
      ignored: [path.join(__dirname, 'pages/blog/_data.json')],
    },
  },
}
