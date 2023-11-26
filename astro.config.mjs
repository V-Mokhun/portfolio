import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { defineConfig, passthroughImageService } from "astro/config";
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind({
    applyBaseStyles: false
  }),, react()],
  image: {
    service: passthroughImageService()
  },
  adapter: netlify()
});