import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import astroI18next from "astro-i18next";
import { defineConfig, passthroughImageService } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import sentry from "@sentry/astro";
import { loadEnv } from "vite";

const { SENTRY_DSN, SENTRY_AUTH_TOKEN } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
  output: "server",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    astroI18next(),
    sentry({
      dsn: SENTRY_DSN,
      sourceMapsUploadOptions: {
        project: "javascript-astro",
        authToken: SENTRY_AUTH_TOKEN,
      },
    }),
  ],
  image: {
    service: passthroughImageService(),
  },
  adapter: vercel(),
});
