/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: "#ffffff",
      textColor: "#333333",
      accentColor: "#c6797e",
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
      },
    },
  },
  variants: {},
  plugins: [
    function ({ addBase, theme }) {
      // addBase({
      //   body: {
      //     backgroundColor: theme("lightTheme.backgroundColor"),
      //     color: theme("lightTheme.textColor"),
      //     // Add more styles using other light theme variables as needed
      //   },
      //   ".dark-theme": {
      //     backgroundColor: theme("darkTheme.backgroundColor"),
      //     color: theme("darkTheme.textColor"),
      //     // Add more styles using other dark theme variables as needed
      //   },
      // })
    },
  ],
}
