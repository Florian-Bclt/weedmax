import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#242B6F",
        secondary: "#D00BA9",
      },
      backgroundImage: {
        "gradient-main": "linear-gradient(to right, #242B6F, #D00BA9)",
        "gradient-light": "linear-gradient(to top, #fff2cd, #ed4254)",
        "gradient-light-reverse": "linear-gradient(to top, #ed4254, #fff2cd)"
      },
    },
  },
  plugins: [],
} satisfies Config;
