import { Container } from "../ui/Container";
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
    <footer className="bg-[var(--color-muted)]/30 border-t border-[var(--color-muted)] py-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <span className="text-xl font-bold tracking-tight block mb-4">
              <span className="text-[var(--color-primary)]">MRG</span> develops
            </span>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              The Cloud Brewery
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)] mt-2">
              {data.tagline}
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">
              {lang === "en" ? "Quick Links" : "Enlaces Rápidos"}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-sm hover:text-[var(--color-primary)]"
                >
                  {lang === "en" ? "About Us" : "Quiénes Somos"}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-sm hover:text-[var(--color-primary)]"
                >
                  {lang === "en" ? "Services" : "Qué Hacemos"}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm hover:text-[var(--color-primary)]"
                >
                  {lang === "en" ? "Contact" : "Contacto"}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">
              {lang === "en" ? "Partners" : "Socios"}
            </h3>
            <div className="flex gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
              {/* Placeholders for partner logos */}
              <span className="font-bold text-slate-500">AWS</span>
              <span className="font-bold text-slate-500">Google Cloud</span>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">
              {lang === "en" ? "Connect" : "Conecta"}
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-muted-foreground)]/10 mt-12 pt-8 text-center text-sm text-[var(--color-muted-foreground)]">
          {data.copyright}
        </div>
      </Container>
    </footer>
  );
};
