import path from 'path'
import { insert, update } from './db'
import handler from './graphql/handler'
import generatePostData from './graphql/generatePostData'
import recursiveReadDir from './recursiveReadDir'
// import { $ } from '@sveltejs/kit/dist/index.js'

const route = {
  src: '^/___graphql$',
  dest: handler,
  match: 'all',
  _srcRegex: /^\/___graphql$/,
}

export default function SnowpackPluginGraphQL(snowpackConfig, pluginOptions) {
  const defaultOptions = {
    content: path.resolve('content'),
  }
  let options = {}

  return {
    name: 'snowpack-plugin-gql',

    async config() {
      if (snowpackConfig.routes && Array.isArray(snowpackConfig.routes)) {
        snowpackConfig.routes.push(route)
      }

      options = {
        ...defaultOptions,
        ...(pluginOptions || {}),
      }

      const pages = await recursiveReadDir(options.content)
      for (let page of pages) {
        await insert(await generatePostData(options.content, page))
      }
      // console.info($.bold().cyan(`> GraphQL Layer Initialized!`))
      console.info(`> GraphQL Layer Initialized!`)

      // init(options.content).then(() => {
      //   console.info($.bold().cyan(`> GraphQL Layer Initialized!`))
      // })
    },

    async onChange({ filePath }) {
      // update file record with new data on change, this helps `load()` get new content in dev
      try {
        await update(
          { absolutePath: filePath },
          {
            $set: { ...(await generatePostData(options.content, filePath)) },
          }
        )
      } catch (error) {
        throw new Error('Unable to update record in database', error)
      }
    },
  }
}
