import { sequence } from "astro:middleware";
import * as Sentry from "@sentry/astro";

export const onRequest = sequence(
  Sentry.handleRequest()
);
