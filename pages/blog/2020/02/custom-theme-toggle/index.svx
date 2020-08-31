---
title: 'Custom Theme Toggle with React hooks and Context API'
description: 'Learn to build a custom theme toggle with React hooks and Context API, passing values dynamically to styled-components. Allowing users to cycle through preset themes'
date: 2020-02-25
tags: ['react', 'hooks', 'websites']
published: true
---

![Peacock Macro](unsplash-peacock.jpg)

Nowadays plenty of sites have opted for a theme toggle allowing users to choose between light and dark modes. Typically we see those that hang out around screens often - developers - choosing dark modes since its a bit easier on the eyes. Other times we'll see a [button that cycles through multiple themes](https://theme-ui.com/) other than light and dark like a Solarized theme; how cool! Here we'll walk through an implementation of this theme toggle with:

- React hooks
- React Context
- styled-components

If you're unfamiliar with hooks or Context, don't worry! Kent C Dodds has [an amazing blog post](https://kentcdodds.com/blog/how-to-use-react-context-effectively) about using React Context effectively, and I find it to outline a great implementation pattern for Context. In fact, I use this pattern a lot, so even if you're familiar with hooks and Context it's worth the read.

Anyways, let's jump in. [Or you can skip to the solution](#solution)

## Starting Out

Since we're just getting started we don't need anything _too_ fancy, let's create a new React project with [CodeSandbox](https://codesandbox.io) or via the shell with:

```shell
npx create-react-app demo-theme-toggle
cd demo-theme-toggle
```

For this demo we'll be using `styled-components` so let's get that added as well:

```shell
yarn add styled-components
```

Now we're ready to crack open the project. Open it in your favorite code editor

```shell
code .
```

**NOTE**: We won't worry too much about directory structure in this demo, therefore all work will be done right in `demo-theme-toggle/src/`.

## Setting up the Theme Provider

Providing our theme to the app is essential for us as developers to _consume_ the theme &mdash; that is without providing something how can we consume it?

**What we will be doing**:

1. Creating two Contexts
1. Consume the state (use values from the current theme)
1. Dispatch an update to the state (change the current theme)
1. Creating the Context Provider
1. Wrap both Contexts with a single component, ultimately to wrap your App's root (with create-react-app, `src/index.js`)
1. Creating a reducer to handle dispatched state changes
1. Creating two hooks
1. _use_ the current theme
1. toggle the theme

First, let's create our theme file

```shell
# demo-theme-toggle/
touch src/theme.js
```

Copy the prebuilt themes for this exercise

```js
// demo-theme-toggle/src/theme.js
const theme = {
  themes: [
    {
      name: 'light',
      colors: {
        background: '#f5f5f5',
        text: '#5a535b',
      },
    },
    {
      name: 'dark',
      colors: {
        background: '#181818',
        text: '#f5f5f5',
      },
    },
    {
      name: 'solarized',
      colors: {
        background: '#073642',
        text: '#fdf6e3',
      },
    },
  ],
  _current: 0,
}

export default theme
```

It's important to note that the `_current` property is prepended with an underscore as we will use it internally, but not be exposed to the user.

### Creating the Context

Now we're ready to create our Contexts, let's create a new file. All further work in this section will be done within this new file.

```shell
touch src/ThemeContext.js
```

And in this new file we'll need our React and theme imports.

```js
import React from 'react'
import theme from './theme'

const ThemeState = React.createContext()
const ThemeDispatch = React.createContext()
```

Here we've _created_ Contexts for both the theme state (current theme values) and theme dispatch (used to update current theme). Let's continue by setting up the Provider component

```js
import React from 'react'
import theme from './theme'

const ThemeState = React.createContext()
const ThemeDispatch = React.createContext()

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(() => {}, theme)
  return (
    <ThemeState.Provider value={state}>
      <ThemeDispatch.Provider value={dispatch}>{children}</ThemeDispatch.Provider>
    </ThemeState.Provider>
  )
}
```

Now we'll be able to export this ThemeProvider and use it at the root of our project, but we're not done just yet. Here we have used the built-in React hook `useReducer`, which takes two arguments:

1. reducer function
2. initial state

### The Reducer

You may have noticed we're passing an empty function into the first argument, let's change that. Above the `ThemeProvider` component we'll write our reducer

```js
const ThemeReducer = (state, action) => {
  switch (action.type) {
    case 'toggle':
    default: {
      return {
        ...state,
        _current: state._current === state.themes.length - 1 ? 0 : (state._current += 1),
      }
    }
  }
}
```

Okay at first glance this may seem like overkill, and for our initial use case it kind of is, however what if we want to add additional features soon like default values such as font families or breakpoint values, and the ability to change those on-demand? Here we're building for a bit of growth. Either way it's concise and mildly performant.

**What's happening** here is that we're incrementing the `_current` value by 1, or if it's hit the length of the `themes` array we reset it to zero. The `_current` value is setting what theme in the `themes` array is currently being used.

Finally we can add it to our Provider

```js
import React from 'react'
import theme from './theme'

const ThemeState = React.createContext()
const ThemeDispatch = React.createContext()

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case 'toggle':
    default: {
      return {
        ...state,
        _current: state._current === state.themes.length - 1 ? 0 : (state._current += 1),
      }
    }
  }
}

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(ThemeReducer, theme)
  return (
    <ThemeState.Provider value={state}>
      <ThemeDispatch.Provider value={dispatch}>{children}</ThemeDispatch.Provider>
    </ThemeState.Provider>
  )
}
```

## Consuming Theme and Dispatch with Hooks

After setting up our provider and mechanism to change the current theme, we're ready to write our own custom hooks to consume the current theme and toggler!

### useTheme

Here is where using the internal `_current` property comes in handy. Another built-in React hook, `useContext` is leveraged here to access `ThemeState`, which is a Context set up to store the current theme. If it is undefined, it is attempting to be used outside of our `ThemeProvider`.

```js
const useTheme = () => {
  const context = React.useContext(ThemeState)
  if (context === undefined) {
    throw new Error('useTheme must be used inside a ThemeProvider')
  }
  return context.themes[context._current]
}
```

So if the current theme is `light` we will get the following value:

```js
{
  name: "light",
  colors: {
    background: "#f5f5f5",
    text: "#5a535b"
  }
}
```

### useThemeToggle

The theme toggle is a bit more straightforward as we've set up our reducer with a default option of incrementing/resetting the current theme.

```js
const useThemeToggle = () => {
  const context = React.useContext(ThemeDispatch)
  if (context === undefined) {
    throw new Error('useThemeToggle must be used inside a ThemeProvider')
  }
  return context
}
```

Similar, but with different error messages.

## All Together

Combining all of the steps together into one file, `src/ThemeContext.js` we get:

```js
import React from 'react'
import theme from './theme'

const ThemeState = React.createContext()
const ThemeDispatch = React.createContext()

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case 'toggle':
    default: {
      return {
        ...state,
        _current: state._current === state.themes.length - 1 ? 0 : (state._current += 1),
      }
    }
  }
}

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(ThemeReducer, theme)
  return (
    <ThemeState.Provider value={state}>
      <ThemeDispatch.Provider value={dispatch}>{children}</ThemeDispatch.Provider>
    </ThemeState.Provider>
  )
}

const useTheme = () => {
  const context = React.useContext(ThemeState)
  if (context === undefined) {
    throw new Error('useTheme must be used inside a ThemeProvider')
  }
  return context.themes[context._current]
}

const useThemeToggle = () => {
  const context = React.useContext(ThemeDispatch)
  if (context === undefined) {
    throw new Error('useThemeToggle must be used inside a ThemeProvider')
  }
  return context
}

export { ThemeProvider, useTheme, useThemeToggle }
```

## Wrapping the Application Root

With the `ThemeProvider` created and exported we're ready to wrap our application root in `src/index.js`

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from './ThemeContext'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  rootElement
)
```

By doing so we're allowing any component (pages, buttons, etc.) within the `<App />` component to import and use our custom hooks. Fancy stuff.

## Quick CSS

Before we proceed, let's update the default CSS to make our App component cover the entire page

```css
/* src/styles.css */
html,
body {
  margin: 0;
  padding: 0;
}

.App {
  font-family: sans-serif;
  text-align: center;
  padding: 5rem;
  height: 100vh;
}
```

## App Component

After all of our hard work we're ready to test out our themes. Let's head over to the App component.

```js
import React from 'react'
import './styles.css'
import styled from 'styled-components'
import { useTheme, useThemeToggle } from './ThemeContext'

const StyledApp = styled.div`
  color: ${props => props.theme.colors.text || 'black'};
  background-color: ${props => props.theme.colors.background || 'white'};
`

export default function App() {
  const theme = useTheme()
  const themeToggle = useThemeToggle()
  return (
    <StyledApp className="App" theme={theme}>
      <h1>ThemeToggle</h1>
      <h2>Current theme: {theme.name}</h2>
      <button onClick={themeToggle}>Toggle Theme</button>
    </StyledApp>
  )
}
```

Now our hooks are imported, are being _used_ in the App component, our styled App component set up to take theme props, and we've added a button to cycle through the themes. Phenomenal work!

With both hooks in the same component you may be wondering why we split them up in the first place. As the application grows, the theme will be used in several, if not all, components whereas the toggle is only needed in a few components (like a button in the header). This allows us to import only what we need for the component to be successful.

## Solution

<iframe
  src="https://codesandbox.io/embed/theme-switcher-6l1g5?codemirror=1"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

## Moving Forward

Demos are fun but I find I learn the most when I try to extend or break what I've created from a demo. Here are some ideas:

- persist user theme choice with `localStorage`
- create default theme props as noted earlier in the demo to include in the current theme
- add more themes!

How are you planning to extend this setup? Send me your ideas by tweeting [@josefaidt](https://twitter.com/josefaidt)
