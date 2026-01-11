import { config, fields, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  singletons: {
    landingPage: singleton({
      label: "Landing Page",
      path: "src/content/landing-page/data",
      schema: {
        hero: fields.object(
          {
            en: fields.object(
              {
                tagline: fields.text({ label: "Tagline (EN)" }),
                heading: fields.text({ label: "Heading (EN)" }),
                description: fields.text({
                  label: "Description (EN)",
                  multiline: true,
                }),
                cta: fields.text({ label: "CTA Label (EN)" }),
                secondaryCta: fields.text({
                  label: "Secondary CTA Label (EN)",
                }),
              },
              { label: "English" }
            ),
            es: fields.object(
              {
                tagline: fields.text({ label: "Tagline (ES)" }),
                heading: fields.text({ label: "Heading (ES)" }),
                description: fields.text({
                  label: "Description (ES)",
                  multiline: true,
                }),
                cta: fields.text({ label: "CTA Label (ES)" }),
                secondaryCta: fields.text({
                  label: "Secondary CTA Label (ES)",
                }),
              },
              { label: "Spanish" }
            ),
          },
          { label: "Hero Section" }
        ),

        about: fields.object(
          {
            en: fields.object(
              {
                heading: fields.text({ label: "Heading (EN)" }),
                text1: fields.text({
                  label: "Paragraph 1 (EN)",
                  multiline: true,
                }),
                text2: fields.text({
                  label: "Paragraph 2 (EN)",
                  multiline: true,
                }),
                highlights: fields.array(fields.text({ label: "Highlight" }), {
                  label: "Highlights (EN)",
                }),
              },
              { label: "English" }
            ),
            es: fields.object(
              {
                heading: fields.text({ label: "Heading (ES)" }),
                text1: fields.text({
                  label: "Paragraph 1 (ES)",
                  multiline: true,
                }),
                text2: fields.text({
                  label: "Paragraph 2 (ES)",
                  multiline: true,
                }),
                highlights: fields.array(fields.text({ label: "Highlight" }), {
                  label: "Highlights (ES)",
                }),
              },
              { label: "Spanish" }
            ),
          },
          { label: "About Section" }
        ),

        services: fields.object(
          {
            en: fields.object(
              {
                heading: fields.text({ label: "Heading (EN)" }),
                subheading: fields.text({ label: "Subheading (EN)" }),
                items: fields.array(
                  fields.object({
                    title: fields.text({ label: "Title" }),
                    description: fields.text({
                      label: "Description",
                      multiline: true,
                    }),
                    icon: fields.select({
                      label: "Icon",
                      options: [
                        { label: "Cloud", value: "Cloud" },
                        { label: "Database", value: "Database" },
                        { label: "Brain", value: "Brain" },
                        { label: "Rocket", value: "Rocket" },
                        { label: "Code2", value: "Code2" },
                      ],
                      defaultValue: "Cloud",
                    }),
                  }),
                  { label: "Service Items" }
                ),
              },
              { label: "English" }
            ),
            es: fields.object(
              {
                heading: fields.text({ label: "Heading (ES)" }),
                subheading: fields.text({ label: "Subheading (ES)" }),
                items: fields.array(
                  fields.object({
                    title: fields.text({ label: "Title" }),
                    description: fields.text({
                      label: "Description",
                      multiline: true,
                    }),
                    icon: fields.select({
                      label: "Icon",
                      options: [
                        { label: "Cloud", value: "Cloud" },
                        { label: "Database", value: "Database" },
                        { label: "Brain", value: "Brain" },
                        { label: "Rocket", value: "Rocket" },
                        { label: "Code2", value: "Code2" },
                      ],
                      defaultValue: "Cloud",
                    }),
                  }),
                  { label: "Service Items" }
                ),
              },
              { label: "Spanish" }
            ),
          },
          { label: "Services Section" }
        ),

        contact: fields.object(
          {
            en: fields.object(
              {
                heading: fields.text({ label: "Heading (EN)" }),
                subheading: fields.text({ label: "Subheading (EN)" }),
                name: fields.text({ label: "Name Label" }),
                emailLabel: fields.text({ label: "Email Label" }), // renaming to emailLabel to avoid conflict? No, component expects 'email'. But schema checks uniqueness? 'email' is also in 'info'.
                // keys in fields.object must be unique. The 'email' key in 'info' is nested. The top level 'email' key is fine.
                // Wait, component uses data.email for label. and data.info.email for value.
                email: fields.text({ label: "Email Field Label" }),
                message: fields.text({ label: "Message Label" }),
                send: fields.text({ label: "Invia Button Label" }),
                info: fields.object({
                  email: fields.text({ label: "Email Address" }),
                  location: fields.text({ label: "Location" }),
                }),
              },
              { label: "English" }
            ),
            es: fields.object(
              {
                heading: fields.text({ label: "Heading (ES)" }),
                subheading: fields.text({ label: "Subheading (ES)" }),
                name: fields.text({ label: "Name Label" }),
                email: fields.text({ label: "Email Field Label" }),
                message: fields.text({ label: "Message Label" }),
                send: fields.text({ label: "Invia Button Label" }),
                info: fields.object({
                  email: fields.text({ label: "Email Address" }),
                  location: fields.text({ label: "Location" }),
                }),
              },
              { label: "Spanish" }
            ),
          },
          { label: "Contact Section" }
        ),

        header: fields.object(
          {
            en: fields.object(
              {
                nav: fields.array(
                  fields.object({
                    label: fields.text({ label: "Label" }),
                    href: fields.text({ label: "Link (#id)" }),
                  }),
                  { label: "Navigation Items" }
                ),
                cta: fields.text({ label: "CTA Button" }),
              },
              { label: "English" }
            ),
            es: fields.object(
              {
                nav: fields.array(
                  fields.object({
                    label: fields.text({ label: "Label" }),
                    href: fields.text({ label: "Link (#id)" }),
                  }),
                  { label: "Navigation Items" }
                ),
                cta: fields.text({ label: "CTA Button" }),
              },
              { label: "Spanish" }
            ),
          },
          { label: "Header & Navigation" }
        ),

        footer: fields.object(
          {
            en: fields.object(
              {
                tagline: fields.text({ label: "Tagline" }),
                copyright: fields.text({ label: "Copyright Text" }),
              },
              { label: "English" }
            ),
            es: fields.object(
              {
                tagline: fields.text({ label: "Tagline" }),
                copyright: fields.text({ label: "Copyright Text" }),
              },
              { label: "Spanish" }
            ),
          },
          { label: "Footer" }
        ),
      },
    }),
  },
});
