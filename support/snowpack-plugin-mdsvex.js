const fs = require('fs').promises
const svelte = require('svelte/compiler')
const { mdsvex, compile } = require('mdsvex')
const frontMatter = require('front-matter')

const ext = /(\.md$|\.svx$)/

module.exports = function SnowpackPluginMdsvex(snowpackConfig, pluginOptions) {
  console.log('LOADED')
  return {
    name: 'snowpack-plugin-mdsvex',
    resolve: { input: ['.svx'], output: ['.js', '.css'] },
    knownEntrypoints: ['svelte/internal'],

    // config() {
    //   console.log('CONFIOG')
    //   // marked.setOptions(pluginOptions)
    //   // set options
    // },

    // transform(args) {
    //   console.log('TRANSFORMING', args.filePath)
    //   if (args.fileExt === '.svx') console.log(args)
    // },

    async load({ filePath }) {
      console.log('LOADING', { filePath })
      if (!ext.test(filePath)) {
        return null
      }
      const contents = await fs.readFile(filePath, 'utf-8')
      const svxPreprocess = await svelte.preprocess(
        contents,
        mdsvex({
          smartypants: true,
          remarkPlugins: [require('remark-slug'), require('remark-autolink-headings')],
          rehypePlugins: [
            [
              require('rehype-local-image-to-cloudinary'),
              {
                baseDir: path.join(__dirname, 'static'),
                uploadFolder: 'josef.dev',
                transformations: 'q_auto,f_auto',
              },
            ],
          ],
        }),
        { filename: filePath }
      )
      // const { attributes, body } = frontMatter(contents)
      // const result = { ...attributes, markdown: body, body: compile(body) }
      const { js, css } = await svelte.compile(svxPreprocess.toString())
      const output = {
        '.js': {
          code: js.code,
        },
      }
      if (css && css.code) {
        output['.css'] = {
          code: css.code,
        }
      }

      return output

      // return `export default ${JSON.stringify(result)}`
    },
  }
}
