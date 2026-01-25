import { Container } from "@/components/ui/Container";
import { Linkedin, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

interface FooterData {
  tagline: string;
  copyright: string;
}

interface FooterProps {
  lang: "en" | "es";
  data: FooterData;
}

export const Footer = ({ lang, data }: FooterProps) => {
  return (
    <footer className="bg-background pt-20 pb-10 shadow-neu-inset relative z-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <span className="text-xl font-bold tracking-tight block mb-6">
              <span className="text-primary">MRG</span> develops
            </span>
            <p className="text-sm text-muted-foreground">The Cloud Brewery</p>
            <p className="text-sm text-muted-foreground mt-2">{data.tagline}</p>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-semibold mb-6">
              {lang === "en" ? "Quick Links" : "Enlaces Rápidos"}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#about"
                  className="text-sm hover:text-primary transition-colors"
                >
                  {lang === "en" ? "About Us" : "Quiénes Somos"}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-sm hover:text-primary transition-colors"
                >
                  {lang === "en" ? "Services" : "Qué Hacemos"}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm hover:text-primary transition-colors"
                >
                  {lang === "en" ? "Contact" : "Contacto"}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-semibold mb-6">
              {lang === "en" ? "Partners" : "Socios"}
            </h3>
            <div className="flex gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
              {/* Placeholders for partner logos */}
              <span className="font-bold text-slate-500">AWS</span>
              <span className="font-bold text-slate-500">Google Cloud</span>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-semibold mb-6">
              {lang === "en" ? "Connect" : "Conecta"}
            </h3>
            <div className="flex gap-4">
              {[
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/mrgdevelops",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  target="_blank"
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-background shadow-neu text-muted-foreground hover:text-primary hover:shadow-neu-hover active:shadow-neu-inset transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-muted/50 mt-16 pt-8 text-center text-sm text-muted-foreground">
          {data.copyright}
        </div>
      </Container>
    </footer>
  );
};
