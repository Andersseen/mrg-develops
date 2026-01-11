import { Section } from "../ui/Section";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Mail, MapPin } from "lucide-react";

interface ContactInfo {
  email: string;
  location: string;
}

interface ContactData {
  heading: string;
  subheading: string;
  name: string;
  email: string;
  message: string;
  send: string;
  info: ContactInfo;
}

interface ContactProps {
  lang: "en" | "es";
  data: ContactData;
}

export const Contact = ({ lang, data }: ContactProps) => {
  return (
    <Section id="contact" className="bg-[var(--color-muted)]/30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {data.heading}
            </h2>
            <p className="text-lg text-[var(--color-muted-foreground)] mb-12">
              {data.subheading}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="p-3 rounded-lg bg-[var(--color-background)] border border-[var(--color-muted)] text-[var(--color-primary)]">
                  <Mail className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href={`mailto:${data.info.email}`}
                    className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {data.info.email}
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
                    {data.info.location}
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
                    {data.name}
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
                    {data.email}
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
                  {data.message}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-3 rounded-md border border-[var(--color-muted)] bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>

              <Button size="lg">{data.send}</Button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
};
