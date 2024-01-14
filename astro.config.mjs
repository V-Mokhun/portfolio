import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import astroI18next from "astro-i18next";
import { defineConfig, passthroughImageService } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    astroI18next(),
    sentry({
      dsn: "https://9d17477b35114d30c440aa1d935f8dab@o4506558168039424.ingest.sentry.io/4506558170660864",
      sourceMapsUploadOptions: {
        project: "javascript-astro",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
  ],
  image: {
    service: passthroughImageService(),
  },
  adapter: vercel(),
});
