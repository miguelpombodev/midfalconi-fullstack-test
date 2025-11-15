import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // adicione esta linha se usar App Router
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7a123a",
          700: "#5a0e2b",
          800: "#4a0b22",
        },
      },
      fontFamily: {
        sans: ["var(--font-epilogue)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
