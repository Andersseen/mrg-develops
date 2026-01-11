import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const landingPage = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx,yaml,yml,json}",
    base: "./src/content/landing-page",
  }),
  schema: z.any(),
});

export const collections = {
  "landing-page": landingPage,
};
