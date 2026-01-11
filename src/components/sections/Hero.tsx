import { motion } from "motion/react";
import { Button } from "@components/ui/Button";
import { Container } from "@components/ui/Container";
import { ArrowRight } from "lucide-react";

interface HeroData {
  tagline: string;
  heading: string;
  description: string;
  cta: string;
  secondaryCta: string;
}

interface HeroProps {
  data: HeroData;
}

export const Hero = ({ data }: HeroProps) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-layout" />
        <div className="absolute top-[10%] right-[20%] w-[35rem] h-[35rem] bg-secondary/10 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-layout" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            {data.tagline}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-balance">
            {data.heading}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-balance leading-relaxed">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="group"
              onClick={() => (window.location.href = "#contact")}
            >
              {data.cta}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = "#services")}
            >
              {data.secondaryCta}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
