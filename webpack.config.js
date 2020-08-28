const { readdirSync, promises: fs } = require('fs')
const path = require('path')
const fm = require('front-matter')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { mdsvex } = require('mdsvex')
const appConfig = require('./app.config')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

async function recursiveReadDir(directory, { only = ['svx'], fullPath = true } = { only: ['svx'], fullPath: true }) {
  const result = []
  const crawl = async filePath => {
    const files = await fs.readdir(filePath, { withFileTypes: true })
    for (const file of files) {
      const _path = path.join(filePath, file.name)
      if (file.isDirectory()) await crawl(_path)
      else if (only.some(o => path.extname(file.name).replace(/^\./, '') === o)) {
        if (fullPath) {
          result.push(_path)
        } else {
          result.push(_path.replace(directory, '').replace(path.extname(_path), ''))
        }
      }
    }
  }
  await crawl(directory)
  return result
}

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

module.exports = {
  entry: {
    bundle: ['./main.js'],
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.mjs', '.js', '.svelte', '.svx'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: __dirname + '/public',
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
            preprocess: mdsvex({
              layout: {
                _: './pages/_mdx.svelte',
              },
              remarkPlugins: [require('remark-autolink-headings')],
            }),
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
  plugins: [
    new BlogBootstrapPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devtool: prod ? false : 'source-map',
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: 'index.html',
    },
    watchOptions: {
      ignored: [path.join(__dirname, 'pages/blog/_data.json')],
    },
  },
}
