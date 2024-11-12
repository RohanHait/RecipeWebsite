import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      charcoal:"var(--charcoal)", 
      persiangreen:"var(--persian-green)",
      saffron:"var(--saffron)",
      sandybrown: "var(--sandy-brown)",
      burntsienna: "var(--burnt-sienna)",
        },
    },
  },
  plugins: [],
};
export default config;
