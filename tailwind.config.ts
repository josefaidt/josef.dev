import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mjs,astro}"],
  theme: {
    extend: {
      // backgroundColor: "#380519",
      // textColor: "#f3e8e0",
      // accentColor: "#c6797e",
      // textDecorationColor: "#c6797e",
      colors: {
        accent: "#c6797e",
        blue: "#1fb6ff",
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        yellow: "#ffc82c",
        "gray-dark": "#273444",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
        rouge: {
          50: "#fbf6f5",
          100: "#f8ebeb",
          200: "#f1dadb",
          300: "#e5bcbd",
          400: "#d59799",
          500: "#c6797e",
          600: "#ab535d",
          700: "#8f414c",
          800: "#783943",
          900: "#68333d",
          950: "#39181d",
        },
      },
    },
  },
}

export default config
