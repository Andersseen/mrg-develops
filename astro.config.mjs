import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

const integrations = [react()];

// Only load Keystatic in dev mode (or if explicit) to avoid adapter requirements for static build
// Only load Keystatic if SKIP_KEYSTATIC is not true
if (!process.env.SKIP_KEYSTATIC) {
  integrations.push(keystatic());
}

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: cloudflare(),
  integrations,
  vite: {
    plugins: [tailwindcss()],
  },
});
