import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#102133",
        sand: "#F8F3EA",
        coral: "#E87A5D",
        teal: "#2E8C84",
        gold: "#CBA14A",
      },
      boxShadow: {
        soft: "0 24px 60px rgba(16, 33, 51, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
