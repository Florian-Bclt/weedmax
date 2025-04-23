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
    keyframes: {
      spinSlow: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      spinFast: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
    animation: {
      'spin-slow': 'spinSlow 1s linear infinite',
      'spin-fast': 'spinFast 0.5s linear infinite reverse',
    },
  },
  plugins: [],
} satisfies Config;
