import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        obsidian: {
          900: "#030304",
          800: "#0a0b0f",
          700: "#2a3541"
        },
        o_emerald: {
          400: "#34d399",
          500: "#10b981",
          700: "#047857"
        },
        o_gold: {
          400: "#fbbf24",
          500: "#f59e0b",
          700: "#b45309"
        },
        o_lapis: {
          400: "#60a5fa",
          500: "#3b82f6",
          700: "#1d4ed8"
        }
      },
    },
  },
  plugins: [],
};
export default config;
