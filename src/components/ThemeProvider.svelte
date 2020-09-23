<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  export let STORAGE_KEY = '__svelte-theme'

  const stylesheet = [...document.styleSheets].find(sheet => /\/theme\.css$/.test(sheet.href))
  const rootCSS = [...stylesheet.rules].find(rule => /^\:root$/gm.test(rule.selectorText))
  if (!rootCSS) throw new Error('ThemeProvider is unable to recognize CSS on root element')
  const themeCSS = [...stylesheet.rules].filter(rule => /^html\.theme--[A-z]\w+$/gm.test(rule.selectorText))
  if (!themeCSS.length) throw new Error('ThemeProvider is unable to recognize presence of themes')

  const themes = themeCSS.map(theme => /(^html\.theme--)([A-z]\w+)$/g.exec(theme.selectorText)[2])
  let currentTheme = writable(themes[0])
  $: setContext('theme', { current: currentTheme, toggle: toggleTheme })

  function toggleTheme() {
    let currentIndex = themes.findIndex(entry => entry === $currentTheme)
    if (currentIndex === themes.length - 1) currentTheme.set(themes[0])
    else currentTheme.set(themes[currentIndex + 1])
  }

  afterUpdate(function () {
    // store.update(existing => ({ ...existing, current: currentTheme }))
    setContext('theme', { current: currentTheme, toggle: toggleTheme })
    return window.localStorage.setItem(STORAGE_KEY, $currentTheme)
  })
  $: document.documentElement.className = `theme--${$currentTheme}`

  onMount(function () {
    let existing = window.localStorage.getItem(STORAGE_KEY)
    if (existing && themes.includes(existing)) currentTheme.set(existing)
    else window.localStorage.setItem(STORAGE_KEY, $currentTheme)
  })
</script>

<slot />

<!--<style>
  :global(html) {
    background-color: var(--theme-background);
    color: var(--theme-text);
  }
</style>-->
