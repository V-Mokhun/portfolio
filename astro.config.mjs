import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import astroI18next from "astro-i18next";
import { defineConfig, passthroughImageService } from "astro/config";
import vercel from "@astrojs/vercel";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://www.v-mokhun.com",
  output: "static",
  vite: { plugins: [tailwindcss()] },
  integrations: [react(), astroI18next(), mdx({})],
  image: {
    service: passthroughImageService(),
  },
  adapter: vercel(),
});
