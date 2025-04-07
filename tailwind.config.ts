/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Config } from "tailwindcss";
import animated from "tailwindcss-animated";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  // @ts-ignore
  plugins: [animated],
};

export default config;
