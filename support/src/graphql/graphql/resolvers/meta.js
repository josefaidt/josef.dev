import path from 'path'
import app from '../../../app.config.js'

export default function queryMeta(parent, args, ctx, info) {
  const appConfig = app
  return appConfig || {}
}
