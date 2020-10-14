import HMR from '@roxi/routify/hmr'
import App from './App.svelte'

const app = HMR(
  App,
  {
    target: document.body,
  },
  'app'
)

window.app = app

export default app
