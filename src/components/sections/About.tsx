import { Section } from "@components/ui/Section";
import { Container } from "@components/ui/Container";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface AboutData {
  heading: string;
  text1: string;
  text2: string;
  highlights: readonly string[];
}

interface AboutProps {
  data: AboutData;
}

export const About = ({ data }: AboutProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setTheme(isDark ? "dark" : "light");
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="about" className="shadow-neu-top">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center bg-gray-50/50 dark:bg-white/5 rounded-full shadow-neu-inset p-12">
              <img
                src={
                  theme === "dark"
                    ? "/img/about-dark.webp"
                    : "/img/about-light.webp"
                }
                alt="Cloud Brewery Pint"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {data.heading}
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground mb-8">
              <p>{data.text1}</p>
              <p>{data.text2}</p>
            </div>

            <ul className="space-y-3">
              {data.highlights.map((highlight, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="font-medium">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
};
