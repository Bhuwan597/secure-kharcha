import type { Config } from "tailwindcss";


const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#008080",
        "dark-color": "#111111",
        "secondary-color": "#FF7F50",
        "light-color": "#ffffff",
      }
    },
  },
  plugins: [],
};
export default config;
