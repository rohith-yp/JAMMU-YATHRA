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
        teal: {
          dark: "#164F50",
          accent: "#237C70",
          hover: "#185a52",
          deep: "#0F3839",
        },
        mint: {
          pale: "#F0F8F3",
          light: "#E2F2E8",
          card: "#F7FCF9",
        },
        accent: {
          green: "#7FE36F",
          terracotta: "#9B4C2F",
          sand: "#EFE6D5",
        },
        charcoal: {
          DEFAULT: "#202D2B",
          muted: "#4A5D5A",
          light: "#6E827F",
        },
        divider: "#D9E3DD",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(22, 79, 80, 0.06)",
        card: "0 10px 30px -5px rgba(22, 79, 80, 0.08)",
        elevated: "0 20px 40px -15px rgba(22, 79, 80, 0.15)",
      }
    },
  },
  plugins: [],
};
export default config;
