import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { CheckCircle2 } from "lucide-react";

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
  return (
    <Section id="about">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-10 absolute inset-0 transform -rotate-6 scale-95" />
            <div className="aspect-square rounded-3xl overflow-hidden border border-[var(--color-muted)] bg-[var(--color-background)] relative z-10 flex items-center justify-center p-8 shadow-2xl">
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

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {data.heading}
            </h2>
            <div className="space-y-6 text-lg text-[var(--color-muted-foreground)] mb-8">
              <p>{data.text1}</p>
              <p>{data.text2}</p>
            </div>

            <ul className="space-y-3">
              {data.highlights.map((highlight, i) => (
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
