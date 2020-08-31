---
title: 'Theming in Svelte with CSS Variables'
description: 'Explore Svelte and theming solutions leveraging platform features like CSS Variables'
date: 2020-03-13
tags: ['svelte', 'css', 'theming', 'websites']
published: true
---

![Peacock - Photo by Steve Harvey on Unsplash](steve-harvey-peacock.jpg)

In React there are numerous theming solutions to choose from; styled-components, Emotion, styled-system, theme-ui &ndash; the list goes on. But in Svelte, a framework that feels like you have a front-row spot on The Platform&trade;, those kinds of solutions don't exist. When I cracked open my brand new Svelte project I knew I wanted I knew I wanted to allow visitors to set (and persist) their preferred theme so they don't have to feel the pain of light mode if they don't want to.

Enter [svelte-themer](https://svelte-themer.now.sh), a solution I originally implemented in as part of my website, but something I recently turned into an [npm package](https://www.npmjs.com/package/svelte-themer).

## What is Svelte?

[Svelte](https://svelte.dev/) has been labeled as the "new framework on the block", touted for being effective and efficient for building web applications quickly. Compared to the big players in the game &mdash; React, Angular, and Vue &mdash; it certainly brings a unique approach to the build process while also component-based.

First of all, it feels very close to the platform meaning fewer frills or abstractions than a framework like React; the platform being the web (plain HTML, CSS, JavaScript). It feels like what natively supported web modules should feel like. Svelte has a few frills; check out this small snippet:

```html
<!-- src/components/Heading.svelte -->
<script>
  export let name = 'World'
</script>

<h1>Hello {name}</h1>

<style>
  h1 {
    color: green;
  }
</style>
```

That's it for a stateful heading component. There's a few things going on here:

```html
<!-- src/components/Heading.svelte -->
<script>
  // define a prop, `name`, (just like React)
  // give it a default value of `World`
  export let name = 'World'
</script>

<!-- use curly braces to refer to `name` value -->
<h1>Hello {name}</h1>

<style>
  /* scoped style */
  h1 {
    color: green;
  }
</style>
```

Now when we want to use it, it'll feel like using any other React component:

```html
<!-- src/App.svelte -->
<script>
  import Heading from './components/Heading.svelte'
</script>

<main>
  <Heading name="Hansel" />
</main>
```

For more information I _highly recommend_ checking out the [tutorial on Svelte's site](https://svelte.dev/tutorial/basics).

## Theming

Thinking about how we want to shape the theme structure we immediately think of two things:

1. Set/Collection of theme objects
2. Toggle function

This means we'll need a way to store the toggle function, provide it to the rest of our app, and consume it somewhere within the app.

Here this component will be a button. If you're coming from React this may seem all too familiar, and it is. We're going to be using two of Svelte's features:

- [context](https://svelte.dev/tutorial/context-api): framework API to provide & consume throughout the app with the help of a wrapper component
- [writable stores](https://svelte.dev/tutorial/writable-stores): store data (themes, current theme)

Svelte's tutorial demonstrates their writable stores by separating the store into its own JavaScript file. This would be preferable if we were to later import the theme values to use in a component's `<script>` section and use the methods that come along with writable stores such as `.set()` and `.update()`, however the colors should not change and the current value will be toggled from the same file. Therefore we're going to include the store right in our context component.

### The Context Component

```html
<!-- src/ThemeContext.svelte -->
<script>
  import { setContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { themes as _themes } from './themes.js'
</script>

<slot>
  <!-- content will go here -->
</slot>
```

Let's take a quick look at these imports:

- `setContext`: allows us to set a context (key/value), here this will be `theme`
- `onMount`: function that runs on component mount
- `writable`: function to set up a writable data store
- `_themes`: our themes!

After the script block you'll notice the `<slot>` tag, and this is special to Svelte. Coming from React think of this as `props.children`; this is where the nested components will go.

#### Presets

A quick look at the preset colors for this demo.

```js
// src/themes.js
export const themes = [
  {
    name: 'light',
    colors: {
      text: '#282230',
      background: '#f1f1f1',
    },
  },
  {
    name: 'dark',
    colors: {
      text: '#f1f1f1',
      background: '#27323a',
    },
  },
]
```

#### Writable Store

```html
<!-- src/ThemeContext.svelte -->
<script>
  import { setContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { themes as _themes } from './themes.js'
  // expose props for customization and set default values
  export let themes = [..._themes]
  // set state of current theme's name
  let _current = themes[0].name

  // utility to get current theme from name
  const getCurrentTheme = name => themes.find(h => h.name === name)
  // set up Theme store, holding current theme object
  const Theme = writable(getCurrentTheme(_current))
</script>

<slot>
  <!-- content will go here -->
</slot>
```

It's important to note that `_current` is prefixed with an underscore as it will be a value we use internally to hold the current theme's name. Similarly with `_themes`, they are used to populate our initial `themes` state. Since we'll be including the current theme's object to our context, it is unnecessary to expose.

#### setContext

```html
<!-- src/ThemeContext.svelte -->
<script>
  import { setContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { themes as _themes } from './themes.js'
  // expose props for customization and set default values
  export let themes = [..._themes]
  // set state of current theme's name
  let _current = themes[0].name

  // utility to get current theme from name
  const getCurrentTheme = name => themes.find(h => h.name === name)
  // set up Theme store, holding current theme object
  const Theme = writable(getCurrentTheme(_current))

  setContext('theme', {
    // provide Theme store through context
    theme: Theme,
    toggle: () => {
      // update internal state
      let _currentIndex = themes.findIndex(h => h.name === _current)
      _current = themes[_currentIndex === themes.length - 1 ? 0 : (_currentIndex += 1)].name
      // update Theme store
      Theme.update(t => ({ ...t, ...getCurrentTheme(_current) }))
    },
  })
</script>

<slot>
  <!-- content will go here -->
</slot>
```

Now we have the context `theme` set up, all we have to do is wrap the App component and it will be accessible through the use of:

```html
<!-- src/MyComponent.svelte -->
<script>
  import { getContext } from 'svelte'
  let theme = getContext('theme')
</script>
```

By doing so, providing access to the `Theme` store and our theme `toggle()` function.

### Consuming Theme Colors - CSS Variables

Since Svelte feels close to The Platform™️ we'll leverage CSS Variables. In regards to the `styled` implementations in React, we will ignore the need for importing the current theme and interpolating values to CSS strings. It's fast, available everywhere, and pretty quick to set up. Let's take a look:

```html
<!-- src/ThemeContext.svelte -->
<script>
  import { setContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { themes as _themes } from './themes.js'
  // expose props for customization and set default values
  export let themes = [..._themes]
  // set state of current theme's name
  let _current = themes[0].name

  // utility to get current theme from name
  const getCurrentTheme = name => themes.find(h => h.name === name)
  // set up Theme store, holding current theme object
  const Theme = writable(getCurrentTheme(_current))

  setContext('theme', {
    // providing Theme store through context makes store readonly
    theme: Theme,
    toggle: () => {
      // update internal state
      let _currentIndex = themes.findIndex(h => h.name === _current)
      _current = themes[_currentIndex === themes.length - 1 ? 0 : (_currentIndex += 1)].name
      // update Theme store
      Theme.update(t => ({ ...t, ...getCurrentTheme(_current) }))
      setRootColors(getCurrentTheme(_current))
    },
  })

  onMount(() => {
    // set CSS vars on mount
    setRootColors(getCurrentTheme(_current))
  })

  // sets CSS vars for easy use in components
  // ex: var(--theme-background)
  const setRootColors = theme => {
    for (let [prop, color] of Object.entries(theme.colors)) {
      let varString = `--theme-${prop}`
      document.documentElement.style.setProperty(varString, color)
    }
    document.documentElement.style.setProperty('--theme-name', theme.name)
  }
</script>

<slot>
  <!-- content will go here -->
</slot>
```

Finally we see `onMount` in action, setting our theme colors when the context component mounts, by doing so exposing the current theme as CSS variables following the nomenclature `--theme-prop` where `prop` is the name of the theme key, like `text` or `background`.

### Toggle Button

For the button toggle we'll create another component, `ThemeToggle.svelte`:

```html
<!-- src/ThemeToggle.svelte -->
<script>
  import { getContext } from 'svelte'
  const { theme, toggle } = getContext('theme')
</script>

<button on:click="{toggle}">{$theme.name}</button>
```

And we're ready to put it all together! We've got our theme context, a toggle button, and presets set up. For the final measure I'll leave it up to you to apply the theme colors using the new CSS variables.

<details>
<summary>
<strong>Hint</strong>
</summary>


```css
main {
  background-color: var(--theme-background);
  color: var(--theme-text);
}
```

</details>


## Theming Result

<iframe
  src="https://codesandbox.io/embed/blog-svelte-theme-pt1-hqi3p?codemirror=1"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

### Moving Forward

Themes are fun, but what about when a user chooses something other than the default set on mount? Try extending this demo by applying persisted theme choice with [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Local_storage)!

## Conclusion

Svelte definitely brings a unique approach to building modern web applications. For a slightly more comprehensive codebase be sure to check out [svelte-themer](https://svelte-themer.now.sh).

If you're interested in more Svelte goodies and opinions on web development or food check me out on Twitter [@josefaidt](https://twitter.com/josefaidt).
