import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  daisyui: {
    themes: [{
      lightModeTheme: {
        "primary": "#F05941" ,
        // "secondary": "#F05941 ",
        "accent": "#1B262C",
        "neutral": "#40A2E3",
        "base-100": "#FEFBF6",
      },
    },"dark","cyberpunk"],
  },
  plugins: [require("daisyui")],
}
export default config
