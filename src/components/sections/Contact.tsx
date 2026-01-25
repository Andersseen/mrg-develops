import { Button } from "@components/ui/Button";
import { Container } from "@components/ui/Container";
import { Section } from "@components/ui/Section";
import { MapPin } from "lucide-react";
import { useState } from "react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const endpoint =
        import.meta.env.DEPLOY_TARGET === "ionos"
          ? "/send-mail.php"
          : "/api/send-email";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {data.heading}
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              {data.subheading}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="p-3 rounded-xl bg-background shadow-neu text-primary">
                  <MapPin className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-semibold mb-1">
                    {lang === "en" ? "Location" : "Ubicación"}
                  </h3>
                  <p className="text-muted-foreground">{data.info.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-background rounded-2xl p-8 shadow-neu">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {data.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full h-12 px-4 rounded-xl bg-background shadow-neu-inset focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
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
                    name="email"
                    className="w-full h-12 px-4 rounded-xl bg-background shadow-neu-inset focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
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
                  name="message"
                  rows={4}
                  className="w-full p-4 rounded-xl bg-background shadow-neu-inset focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none placeholder:text-muted-foreground/50"
                  required
                ></textarea>
              </div>

              <div className="flex flex-col gap-4">
                <Button size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : data.send}
                </Button>
                {status === "success" && (
                  <p className="text-sm text-green-500 font-medium">
                    Message sent successfully!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-500 font-medium">
                    Failed to send message. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
};
