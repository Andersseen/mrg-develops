import { Cloud, Database, Brain, Rocket, Code2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { cn } from "@/components/ui/Button";

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
    <Section id="services" className="bg-muted/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {data.heading}
          </h2>
          <p className="text-xl text-muted-foreground">{data.subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Cloud;
            return (
              <div
                key={index}
                className={cn(
                  "p-8 rounded-2xl bg-background border border-muted",
                  "hover:border-primary/50 hover:shadow-lg transition-all duration-300",
                  "group"
                )}
              >
                <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
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
