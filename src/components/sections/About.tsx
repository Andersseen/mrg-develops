import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { CheckCircle2 } from "lucide-react";

interface AboutProps {
  lang: "en" | "es";
}

export const About = ({ lang }: AboutProps) => {
  const content = {
    en: {
      heading: "Who We Are",
      text1:
        "MRG develops is a forward-thinking AI- and Cloud-first company led by certified experts in AWS and Google Cloud. We bring together deep expertise in infrastructure, data engineering, and AI integration.",
      text2:
        "With a strong focus on reliability, cost efficiency, and performance, we design tailored architectures to meet your unique business goals.",
      highlights: [
        "Certified AWS & Google Cloud Experts",
        "Focus on Reliability & Automation",
        "Cutting-edge AI Integration",
        "Customer-Centric Approach",
      ],
    },
    es: {
      heading: "Quiénes Somos",
      text1:
        "MRG develops es una empresa vanguardista centrada en IA y Cloud, liderada por expertos certificados en AWS y Google Cloud. Unimos experiencia profunda en infraestructura, ingeniería de datos e integración de IA.",
      text2:
        "Con un fuerte enfoque en confiabilidad, eficiencia de costos y rendimiento, diseñamos arquitecturas a medida para cumplir con sus objetivos comerciales únicos.",
      highlights: [
        "Expertos Certificados en AWS y Google Cloud",
        "Enfoque en Confiabilidad y Automatización",
        "Integración de IA de Vanguardia",
        "Enfoque Centrado en el Cliente",
      ],
    },
  };

  const text = content[lang];

  return (
    <Section id="about">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image/Visual Side */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-10 absolute inset-0 transform -rotate-6 scale-95" />
            <div className="aspect-square rounded-3xl overflow-hidden border border-[var(--color-muted)] bg-[var(--color-background)] relative z-10 flex items-center justify-center p-8 shadow-2xl">
              {/* Placeholder for abstract visual or team photo */}
              <div className="text-center">
                <span className="text-6xl font-bold text-[var(--color-primary)] opacity-20 block">
                  MRG
                </span>
                <span className="text-xl text-[var(--color-muted-foreground)] uppercase tracking-widest">
                  Develops
                </span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {text.heading}
            </h2>
            <div className="space-y-6 text-lg text-[var(--color-muted-foreground)] mb-8">
              <p>{text.text1}</p>
              <p>{text.text2}</p>
            </div>

            <ul className="space-y-3">
              {text.highlights.map((highlight, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
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
