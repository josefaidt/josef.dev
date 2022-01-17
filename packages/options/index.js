import { resolve } from 'path'
import merge from 'deepmerge'

export const defaults = {
  content: resolve('content'),
  api: '/___graphql',
  app: {
    title: 'Svelte App',
    url: 'https://svelte.dev',
    description: 'Svelte app',
    keywords: ['svelte', 'app'],
    author: 'josefaidt',
  },
}

export class Options {
  constructor({ content, api, app } = defaults) {
    this.init()
    this.content = content
    this.api = api
    this.app = app
  }

  update(newOptions) {
    merge(this, newOptions)
  }

  async init() {
    const appConfig = resolve('app.config.js')
    if (appConfig) {
      import(appConfig).then((opts) =>
        Object.assign(this.app, opts?.default ?? {})
      )
    }
  }
}

export default new Options()
