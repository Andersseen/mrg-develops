import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactProps {
  lang: "en" | "es";
}

export const Contact = ({ lang }: ContactProps) => {
  const content = {
    en: {
      heading: "Get in Touch",
      subheading: "Let's shape the future of your cloud environment.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      info: {
        email: "contact@mrgdevelops.com",
        location: "Global / Remote",
      },
    },
    es: {
      heading: "Contáctanos",
      subheading: "Demos forma al futuro de su entorno en la nube.",
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
      send: "Enviar Mensaje",
      info: {
        email: "contact@mrgdevelops.com",
        location: "Global / Remoto",
      },
    },
  };

  const text = content[lang];

  return (
    <Section id="contact" className="bg-[var(--color-muted)]/30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {text.heading}
            </h2>
            <p className="text-lg text-[var(--color-muted-foreground)] mb-12">
              {text.subheading}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="p-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-muted)] text-[var(--color-primary)]">
                  <Mail className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href={`mailto:${text.info.email}`}
                    className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {text.info.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="p-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-muted)] text-[var(--color-primary)]">
                  <MapPin className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-semibold mb-1">
                    {lang === "en" ? "Location" : "Ubicación"}
                  </h3>
                  <p className="text-[var(--color-muted-foreground)]">
                    {text.info.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[var(--color-background)] rounded-2xl p-8 border border-[var(--color-muted)] shadow-sm">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {text.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full h-10 px-3 rounded-md border border-[var(--color-muted)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {text.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full h-10 px-3 rounded-md border border-[var(--color-muted)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {text.message}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-3 rounded-md border border-[var(--color-muted)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>

              <Button size="lg">{text.send}</Button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
};
