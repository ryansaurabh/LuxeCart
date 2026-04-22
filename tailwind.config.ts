import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#FFFFFF",
          warm: "#FAFAF8",
        },
        ink: "#0A0A0A",
        accent: "#B8860B",
        rose: "#F5E6E0",
        muted: "#6B7280",
        success: "#059669",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,10,10,0.04), 0 1px 3px rgba(10,10,10,0.04)",
        hover: "0 8px 30px rgba(10,10,10,0.08)",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        kenburns: "kenburns 18s ease-out infinite alternate",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
