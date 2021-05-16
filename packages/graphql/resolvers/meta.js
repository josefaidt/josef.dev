import { resolve } from 'path'
import defaultOptions from '../options'

export async function meta(parent, args, ctx, info) {
  const svelteConfig = await import(resolve('svelte.config.js'))
  return svelteConfig?.app || defaultOptions.app
}
