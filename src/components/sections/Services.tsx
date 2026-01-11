import { Cloud, Database, Brain, Rocket, Code2 } from "lucide-react";
import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { cn } from "../ui/Button";

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

interface ServicesData {
  heading: string;
  subheading: string;
  items: readonly ServiceItem[];
}

interface ServicesProps {
  data: ServicesData;
}

const iconMap: Record<string, any> = {
  Cloud,
  Database,
  Brain,
  Rocket,
  Code2,
};

export const Services = ({ data }: ServicesProps) => {
  return (
    <Section id="services" className="bg-[var(--color-muted)]/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {data.heading}
          </h2>
          <p className="text-xl text-[var(--color-muted-foreground)]">
            {data.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Cloud;
            return (
              <div
                key={index}
                className={cn(
                  "p-8 rounded-2xl bg-[var(--color-background)] border border-[var(--color-muted)]",
                  "hover:border-[var(--color-primary)]/50 hover:shadow-lg transition-all duration-300",
                  "group"
                )}
              >
                <div className="mb-6 inline-flex p-4 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
