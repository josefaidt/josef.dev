import App from './App.svelte'
import info from './app.config'

const app = new App({
  target: document.body,
  props: {
    title: info.name,
  },
})

window.app = app

export default app
