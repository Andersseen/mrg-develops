import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export async function getLandingPageData() {
  const data = await reader.singletons.landingPage.read();
  return data;
}

export async function getLocalizedLandingPageData(lang: "en" | "es") {
  const data = await getLandingPageData();

  if (!data) {
    throw new Error("Landing page data not found");
  }

  return {
    hero: data.hero[lang],
    about: data.about[lang],
    services: data.services[lang],
    contact: data.contact[lang],
    header: data.header[lang],
    footer: data.footer[lang],
  };
}

export type LandingPageData = Awaited<ReturnType<typeof getLandingPageData>>;
