import { Cloud, Database, Brain, Rocket, Code2 } from "lucide-react";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { cn } from "../ui/Button";

interface ServicesProps {
  lang: "en" | "es";
}

export const Services = ({ lang }: ServicesProps) => {
  const content = {
    en: {
      heading: "Our Expertise",
      subheading: "Comprehensive Cloud & AI Solutions",
      items: [
        {
          title: "Cloud Architecture",
          description:
            "Robust cloud-native, multi-cloud and hybrid-cloud architectures tailored to unique business goals.",
          icon: Cloud,
        },
        {
          title: "Data Engineering",
          description:
            "Maximize the value of your data with scalable data pipelines and advanced analytics infrastructure.",
          icon: Database,
        },
        {
          title: "Artificial Intelligence",
          description:
            "Top-notch AI / ML / GenAI integration to accelerate digital transformation.",
          icon: Brain,
        },
        {
          title: "Cloud Native App Development",
          description:
            "Building modern, scalable applications designed specifically for the cloud environment.",
          icon: Code2,
        },
        {
          title: "Digital Transformation",
          description:
            "Strategic guidance to help organizations modernize and thrive in the digital age.",
          icon: Rocket,
        },
      ],
    },
    es: {
      heading: "Nuestra Experiencia",
      subheading: "Soluciones Integrales de Nube e IA",
      items: [
        {
          title: "Arquitectura Cloud",
          description:
            "Arquitecturas cloud-native, multi-cloud e híbridas robustas y adaptadas a objetivos comerciales únicos.",
          icon: Cloud,
        },
        {
          title: "Ingeniería de Datos",
          description:
            "Maximice el valor de sus datos con pipelines escalables e infraestructura de análisis avanzada.",
          icon: Database,
        },
        {
          title: "Inteligencia Artificial",
          description:
            "Integración de primera clase de IA / ML / GenAI para acelerar la transformación digital.",
          icon: Brain,
        },
        {
          title: "Desarrollo de Apps Cloud Native",
          description:
            "Construcción de aplicaciones modernas y escalables diseñadas específicamente para la nube.",
          icon: Code2,
        },
        {
          title: "Transformación Digital",
          description:
            "Guía estratégica para ayudar a las organizaciones a modernizarse y prosperar en la era digital.",
          icon: Rocket,
        },
      ],
    },
  };

  const text = content[lang];

  return (
    <Section id="services" className="bg-[var(--color-muted)]/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {text.heading}
          </h2>
          <p className="text-xl text-[var(--color-muted-foreground)]">
            {text.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {text.items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "p-8 rounded-2xl bg-[var(--color-background)] border border-[var(--color-muted)]",
                "hover:border-[var(--color-primary)]/50 hover:shadow-lg transition-all duration-300",
                "group"
              )}
            >
              <div className="mb-6 inline-flex p-4 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
