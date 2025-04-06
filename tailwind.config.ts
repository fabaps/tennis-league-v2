import type { Config } from "tailwindcss";
import tailwindcssAnimated from "tailwindcss-animated";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [tailwindcssAnimated],
};

export default config;
