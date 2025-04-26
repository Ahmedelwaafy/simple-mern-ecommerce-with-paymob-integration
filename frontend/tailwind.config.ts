import type { Config } from "tailwindcss";

const config = {
  mode: "jit",
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        error: "#db2777",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      gridTemplateColumns: {
        new4: "repeat(4, minmax(100px, 500px))",
        auto_fit: "repeat(auto-fit, minmax(250px, 1fr))",
      },
      height: {
        "page-height": "calc(100vh - 140px)",
        "vendor-dash-page-height": "calc(100vh - 156px)",
      },
      minHeight: {
        "page-height": "calc(100vh - 140px)",
        "vendor-dash-page-height": "calc(100vh - 156px)",
      },
    },
    screens: {
      "6xl": { max: "1536px" },
      "5xl": { max: "1400px" },
      "4xl": { max: "1350px" },
      "2xl": { max: "1270px" },
      xl: { max: "1200px" },
      lg: { max: "1024px" },
      amd: { max: "850px" },
      md: { max: "768px" },
      ss: { max: "660px" },
      sm: { max: "560px" },
      xs: { max: "400px" },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    //require("@tailwindcss/forms"),
    require("tailwindcss-animated"),
  ],
} satisfies Config;

export default config;
