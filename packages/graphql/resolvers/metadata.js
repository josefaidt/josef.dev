import { resolve } from 'path'
import config from '@josef/options'

export async function metadata(parent, args, ctx, info) {
  const svelteConfig = await import(resolve('svelte.config.js'))
  return svelteConfig?.app || config.app
}
