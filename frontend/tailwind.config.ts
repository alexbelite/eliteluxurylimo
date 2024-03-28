import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bartkey: ["BARTKEY", "sans-serif"],
        timesroman: ["Times New Roman", "sans-serif"],
        rochester: ["Rochester", "sans-serif"],
        baskerville: ["Baskerville", "sans-serif"],
      },
      keyframes: {
        "scrolling-banner": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - var(--gap)/2))" },
        },
        "scrolling-banner-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-50% - var(--gap)/2))" },
        },
      },
      animation: {
        "scrolling-banner": "scrolling-banner 5s linear infinite",
        "scrolling-banner-vertical":
          "scrolling-banner-vertical 5s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("daisyui")],
};
export default config;
