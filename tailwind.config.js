/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          light: "hsl(var(--foreground-light))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          dark: "hsl(var(--primary-dark))",
          foreground: "hsl(var(--primary-foreground))",
        },
        title: {
          DEFAULT: "hsl(var(--title))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
      spacing: {
        "header-height": "var(--header-height)",
        "header-scroll-height": "var(--header-scroll-height)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        xxs: "360px",
        xs: "479px",
      },
      fontSize: {
        "heading-sm": "1.75rem",
        heading: "2rem",
        "clamp-heading-big": "clamp(2.25rem, 8vw, 4.5rem)",
        "clamp-heading": "clamp(1.625rem, 5vw, 2rem)",
        "clamp-heading-sm": "clamp(1.5rem, 5vw, 1.75rem)",
      },
      boxShadow: {
        "card-sm": "0 20px 30px -15px var(--card);",
        "card-md": "0 10px 30px -10px var(--card)",
      },
      keyframes: {
        "horizontal-bounce": {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(-30px)" },
        },
        zoom: {
          "0%, 100%": { transform: "scale(1)", opacity: 1 },
          "50%": { transform: "scale(0.3)", opacity: 0.3 },
        },
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
        "horizontal-bounce": "horizontal-bounce 3s ease-in-out infinite",
        zoom: "zoom 5s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
};
