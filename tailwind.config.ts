import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      main: "#2d3e4f",
      sub: "#cf404d",
      black: "#313131",
      gray: "#737373",
      backgroundGray: "#fafafa",
      borderGray: "#e1e1e1",
      mainShade: "#24323f",
      mainTint: "#576572",
      mainBrightTint: "#6c7884",
      subShade: "#a6333e",
      subTint: "#d96671",
      white: "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
