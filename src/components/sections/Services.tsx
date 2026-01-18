import { Cloud, Database, Brain, Rocket, Code2 } from "lucide-react";
import { Section } from "@components/ui/Section";
import { Container } from "@components/ui/Container";
import { BentoGrid, BentoGridItem } from "@components/ui/BentoGrid";

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
    <Section id="services">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {data.heading}
          </h2>
          <p className="text-xl text-muted-foreground">{data.subheading}</p>
        </div>

        <BentoGrid className="max-w-8xl mx-auto">
          {data.items.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Cloud;
            return (
              <BentoGridItem
                key={index}
                title={item.title}
                description={item.description}
                header={
                  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl items-center justify-center shadow-neu-inset">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                }
                className={
                  index === 3 || index === 4 ? "md:col-span-3" : "md:col-span-2"
                }
              />
            );
          })}
        </BentoGrid>
      </Container>
    </Section>
  );
};
