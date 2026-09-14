import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        // Semantic preparation risk tokens
        risk: {
          low: "#10b981",     // Emerald
          watch: "#f59e0b",   // Amber
          high: "#f97316",    // Orange
          critical: "#ef4444" // Red
        },
        // Memory stability buckets
        bucket: {
          red: "#ef4444",
          yellow: "#eab308",
          green: "#22c55e"
        },
        // Question type badges
        qtype: {
          mcq: "#3b82f6",     // Blue
          msq: "#8b5cf6",     // Purple
          nat: "#06b6d4"      // Teal
        }
      },
    },
  },
  plugins: [],
};
export default config;
