import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import astroI18next from "astro-i18next";
import { defineConfig, passthroughImageService } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import sentry from "@sentry/astro";
import { loadEnv } from "vite";
import mdx from "@astrojs/mdx";

const { SENTRY_DSN, SENTRY_AUTH_TOKEN } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    astroI18next(),
    sentry({
      environment: import.meta.env.PROD ? "production" : "development",
      enabled: import.meta.env.PROD,
      dsn: SENTRY_DSN,
      sourceMapsUploadOptions: {
        project: "javascript-astro",
        authToken: SENTRY_AUTH_TOKEN,
      },
    }),
    mdx(),
  ],
  image: {
    service: passthroughImageService(),
  },
  adapter: vercel(),
});
