import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "light-bg": "#ededed", // Light mode primary background
        "light-btn": "#ffffff", // Light mode secondary (buttons)
        "light-text": "#f5f5f5", // Light mode secondary text color
        "dark-bg": "#0a0a0a", // Dark mode primary background
        "dark-btn": "#171717", // Dark mode secondary background and light mode buttons
        "dark-text": "#1f1f1f", // Dark mode secondary text color
        "discount-red": "#EE111B",
      },
      backgroundImage: {
        "header-gradient":
          "linear-gradient(to right, #004457, #194d5d,#36515c,#36515c,#69615d,#69615d, #44555c,#36525c)",
        "parallax-main": "url('/imgs/home.jpg')",
      },
      fontFamily: {
        title: ["var(--font-alegreya)", "serif"],
        text: ["var(--font-lora)", "serif"],
      },
      boxShadow: {
        model: "0px 10px 3000px 1500px rgba(0, 0, 0, 0.5)", //Full screen shadow
      },
      fontSize: {
        "4xs": "0.5rem",
        "3xs": "0.625rem",
        "2xs": "0.75rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
