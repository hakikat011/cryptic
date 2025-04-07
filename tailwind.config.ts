import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Solo Leveling theme colors
        solo: {
          purple: {
            light: "#9747FF",
            DEFAULT: "#7209B7",
            dark: "#3A0CA3",
          },
          blue: {
            light: "#4361EE",
            DEFAULT: "#3A0CA3",
            dark: "#160040",
          },
          black: "#0D0D0D",
          gray: {
            light: "#2D2D2D",
            DEFAULT: "#1A1A1A",
            dark: "#0D0D0D",
          },
          accent: "#4CC9F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        // Solo Leveling specific fonts
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        // Solo Leveling specific animations
        "shadow-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(151, 71, 255, 0.5)" },
          "50%": { boxShadow: "0 0 30px rgba(151, 71, 255, 0.8)" },
        },
        "text-flicker": {
          "0%, 100%": { textShadow: "0 0 8px rgba(151, 71, 255, 0.8)" },
          "50%": { textShadow: "0 0 15px rgba(151, 71, 255, 1)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(151, 71, 255, 0.5)" },
          "50%": { borderColor: "rgba(151, 71, 255, 1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        // Solo Leveling specific animations
        "shadow-pulse": "shadow-pulse 3s ease-in-out infinite",
        "text-flicker": "text-flicker 3s ease-in-out infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

