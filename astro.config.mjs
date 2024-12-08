import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import astroI18next from "astro-i18next";
import { defineConfig, passthroughImageService } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://www.v-mokhun.com",
  output: "static",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    astroI18next(),
    mdx({}),
  ],
  image: {
    service: passthroughImageService(),
  },
  adapter: vercel(),
});
