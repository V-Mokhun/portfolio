/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#20B2AA",
        },
        background: {
          DEFAULT: "#2E2E2E",
        },
      },
    },
  },
  plugins: [],
};
