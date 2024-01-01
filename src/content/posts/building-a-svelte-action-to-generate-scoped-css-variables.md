---
title: Building a Svelte Action to Generate Scoped CSS Variables
description: Learn how to build a Svelte Action to generated localized CSS variables
tags: ["svelte", "css", "theming"]
pubDate: 2022-01-23
isFeatured: true
---

<a href="https://unsplash.com/photos/Kx060cRsmt0" target="_blank">

![strawberry picking](https://user-images.githubusercontent.com/5033303/150690053-5e93800d-218d-4aab-ae1e-a118cfcd98cd.png)

</a>

As I was working on a few housekeeping updates for [svelte-themer](https://www.npmjs.com/package/svelte-themer) I was thinking of a way to write an [action with the `use` directive](https://svelte.dev/tutorial/actions) that leverages the existing codebase to create scoped "themes", or in this case it would better be described as scoped CSS variables. While we can use themes created by themer by simply setting a `theme` prop to theme components, what if we wanted to disconnect from the wrapper and add variables directly. Perhaps these variables are specific to the component we're building and we just do not feel like writing the variables ourselves. Turns out this was relatively straightforward:

```js
import { createCSSVariableCollection } from "../support/css"

/**
 * @typedef {Object} ActionReturn
 * @property {Function} [update]
 * @property {Function} [destroy]
 */

/**
 * use:theme
 * @param {HTMLElement} node
 * @param {Object.<string, string|number>} theme
 * @returns {ActionReturn}
 */
export async function theme(node, theme) {
  /**
   *
   * @param {string} name
   * @param {string} value
   * @returns {void}
   */
  function setProperty(name, value) {
    if (!node.style && node.document?.documentElement) {
      node.document.documentElement.style.setProperty(name, value)
      return
    }
    node.style.setProperty(name, value)
    return
  }

  function setProperties() {
    const variables = createCSSVariableCollection(theme)
    for (let [name, value] of variables) {
      setProperty(name, value)
    }
  }

  setProperties()

  return {
    update(newTheme) {
      theme = newTheme
      setProperties()
    },
  }
}
```

This allows us to then use this action in a component and pass a `theme` object, which is really just an object of variable names and values (not limited to color tokens).

> Using [this example on Stackblitz](https://stackblitz.com/edit/sveltekit-s7wvm2?file=src%2Froutes%2Findex.svelte) we're using the action above to add styles to the document root as well as using it to customize theming of a container component.

```html
<script>
  import { theme as useTheme } from "svelte-themer/use"
  import { presets } from "svelte-themer"

  export let theme = {
    colors: {
      background: presets.dark.colors.background.contrast,
      text: presets.dark.colors.secondary,
    },
  }
</script>

<div class="container-component" use:useTheme="{theme}">
  <slot />
</div>

<style>
  div {
    padding: 2rem;
    border-radius: 0.5rem;
    background-color: var(--colors-background);
    color: var(--colors-text);
  }
</style>
```

## Difference with Svelte CSS custom properties

With Svelte's CSS custom properties we can apply CSS variables directly to a component:

```html
<Container --colors-background={"#bbb"}>
  <p>Hello, World!</p>
</Container>
```

When doing so, Svelte creates a wrapper `div` element and applies these properties using inline styles:

![output HTML when using Svelte custom properties](https://user-images.githubusercontent.com/5033303/150698553-1b88e95f-5cf9-4903-af8d-cebbdcc9fc63.png)

In the screenshot above we can see the `container-component` class which signifies the container component itself, and when using the action inside the container component instead of creating an additional element with inlined styles the styles are inlined on the component's element where the action is used. While no functionality is lost either way, styles are applied inline.

![output HTML when using "theme" action](https://user-images.githubusercontent.com/5033303/150698708-fe660636-1913-4e45-b3b7-1bcb52d3356e.png)

In the end the implementation is not all that different, but the usage is different. Svelte CSS custom properties can be applied to components where actions are not. Similarly custom properties are not allowed on DOM elements since they are not valid attributes, but actions can be applied using the `use` directive.

## Using a Stylesheet

With the same approach, let's say instead of inlining CSS we create a sort of "scoped" stylesheet. Although [`<style scoped>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement/scoped) is deprecated, we have the information we need inside the action to create a selector for the element in which the action is applied:

```js
/**
 * use:stylesheet
 * @param {HTMLElement} node
 * @param {Object.<string, string|number>} theme
 * @returns {ActionReturn}
 */
export async function stylesheet(node, theme) {
  const stylesheet = document.createElement("style")

  function setStylesheet() {
    const variables = createCSSVariableCollection(theme)
    const svelteClass = Array.from(node.classList).find((className) =>
      className.startsWith("s-"),
    )
    let innerHTML = `${node.localName}${svelteClass ? `.${svelteClass}` : ""}{`
    for (let [name, value] of variables) {
      innerHTML += `${name}:${value};`
    }
    innerHTML += "}"
    stylesheet.innerHTML = innerHTML
    node.prepend(stylesheet)
  }

  setStylesheet()

  return {
    update(newTheme) {
      theme = newTheme
      setStylesheet()
    },
  }
}
```

Here, we create a `style` element and add styles scoped to the parent element:

![HTML output when using the stylesheet action](https://user-images.githubusercontent.com/5033303/150701679-ee35c6de-a8c6-41a6-9e87-106575200e3c.png)

Again, no overall change in functionality but with the `stylesheet` action the outputted HTML will be easier to traverse as the action payload grows.

## Final Thoughts

The new `theme` action in [svelte-themer](https://svelte-themer.vercel.app/) can be used to circumvent using the existing components like `ThemeWrapper`, and although the intention applies to different use cases both are powered by the same core library.
