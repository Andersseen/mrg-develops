// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";

const integrations = [react()];

// Only load Keystatic in dev mode (or if explicit) to avoid adapter requirements for static build
if (process.env.NODE_ENV === "development") {
  integrations.push(keystatic());
}

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations,
  vite: {
    plugins: [tailwindcss()],
  },
});
