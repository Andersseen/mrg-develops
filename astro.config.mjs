import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const integrations = [react()];

if (!process.env.SKIP_KEYSTATIC) {
  integrations.push(keystatic());
}

export default defineConfig({
  output: "static",
  adapter: vercel(),
  integrations,
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@lib": path.resolve(__dirname, "./src/lib"),
      },
    },
  },
});
