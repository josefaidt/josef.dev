export const ja = {
  black: {
    _: '#17182b',
    dark: '#151627',
    darker: '#0e0e1a',
    light: '#5d5d6b',
    lighter: '#c5c7cb',
  },
  white: {
    _: 'white',
    dark: 'whitesmoke',
  },
  primary: {
    _: '#d46a6a',
    light: '#b26d71',
  },
  secondary: '#518a8d',
  accent: '#c6797e',
  grey: {
    _: '#8b868c',
    light: 'dimgrey',
    dark: '#5a535b',
  },
  shadow: {
    light: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.2)',
  },
}

export const themes = {
  light: {
    bg: {
      _: ja.white._,
      contrast: ja.white.dark,
    },
    text: ja.grey.dark,
    primary: {
      _: ja.primary._,
      light: ja.primary._,
    },
    accent: ja.accent,
    shadow: ja.shadow.light,
  },
  dark: {
    bg: {
      _: ja.black.darker,
      contrast: ja.black._,
    },
    text: ja.black.lighter,
    primary: {
      _: ja.primary.light,
      light: ja.accent,
    },
    accent: ja.secondary,
    shadow: ja.black.light,
  },
}
