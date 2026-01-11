import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  lang: "en" | "es";
}

export const Hero = ({ lang }: HeroProps) => {
  const content = {
    en: {
      tagline: "The Cloud Brewery",
      heading: "Your AI-driven Multi-Cloud Technology Partner",
      description:
        "We specialize in architecting modern, scalable, robust and secure cloud-native solutions. Empowering businesses to innovate and grow by leveraging cutting-edge cloud technologies.",
      cta: "Start Your Journey",
      secondaryCta: "Explore Services",
    },
    es: {
      tagline: "The Cloud Brewery",
      heading: "Su Socio Tecnológico Multi-Cloud Impulsado por IA",
      description:
        "Nos especializamos en arquiitecturas modernas, escalables, robustas y seguras. Empoderando a las empresas para innovar y crecer aprovechando tecnologías en la nube de vanguardia.",
      cta: "Comienza Tu Viaje",
      secondaryCta: "Explorar Servicios",
    },
  };

  const text = content[lang];

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40rem] h-[40rem] bg-[var(--color-primary)]/10 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-layout" />
        <div className="absolute top-[10%] right-[20%] w-[35rem] h-[35rem] bg-[var(--color-secondary)]/10 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-layout" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-semibold mb-6">
            {text.tagline}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-balance">
            {text.heading}
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-muted-foreground)] max-w-3xl mx-auto mb-10 text-balance leading-relaxed">
            {text.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="group"
              onClick={() => (window.location.href = "#contact")}
            >
              {text.cta}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = "#services")}
            >
              {text.secondaryCta}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
