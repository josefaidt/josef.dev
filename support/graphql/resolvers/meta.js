import path from 'path'
import app from '../../../app.config'

export default function queryMeta(parent, args, ctx, info) {
  const appConfig = app
  return appConfig || {}
}
