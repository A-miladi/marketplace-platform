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
        primary: {
          50: "#EBFBFF",
          100: "#D2F5FF",
          200: "#AFEEFF",
          300: "#79E7FF",
          400: "#3AD5FF",
          500: "#0CB7FF",
          600: "#0094FF",
          700: "#007BFF",
          800: "#0064D3",
          900: "#0357A5",
          950: "#052240",
        },
        secondary: {
          50: "#FBF7F1",
          100: "#F5EBDF",
          200: "#E9D5BF",
          300: "#DEBC9D",
          400: "#CC946B",
          500: "#C1794E",
          600: "#B46542",
          700: "#955139",
          800: "#794333",
          900: "#62382C",
          950: "#341B16",
        },
        neutral: {
          50: "#F6F6F6",
          100: "#E7E7E7",
          200: "#D1D1D1",
          300: "#B0B0B0",
          400: "#888888",
          500: "#6D6D6D",
          600: "#5D5D5D",
          700: "#4F4F4F",
          800: "#454545",
          900: "#3D3D3D",
          950: "#0C0C0C",
        },
        state: {
          50: "#E5E5E5",
          100: "#343434",
          200: "#232323",
          300: "#1F1F1F",
        },
      },
      boxShadow: {
        uniq_shadow: "0px 4px 8px 0px rgb(0 , 0 , 0 , 0.05)",
        bottom_bar: "-1px -2px 16px 0px #2632381F",
        custom_shadow: "0px 0px 5px rgba(136, 136, 136, 0.27)",
      },
      transitionTimingFunction: {
        "cubic-bezier": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      // add this just in case
      padding: {
        extralg: "108px",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInFromTop: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 150ms ease-out",
        slideInFromTop: "slideInFromTop 150ms ease-out",
      },
    },
  },

  plugins: [],
} satisfies Config;
