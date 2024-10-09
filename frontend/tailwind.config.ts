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
        'light-shades': "var(--light-shades)",
        'light-accent': "var(--light-accent)",
        'main-brand-color': "var(--main-brand-color)",
        'dark-accent': "var(--dark-accent)",
        'dark-shades': "var(--dark-shades)",
      },
    },
  },
  plugins: [],
};
export default config;