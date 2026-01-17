import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@components/ui/Button";
import { Container } from "@components/ui/Container";
import { ThemeToggle } from "@components/ThemeToggle";
import { useScrollSpy } from "@lib/../hooks/useScrollSpy";

interface HeaderData {
  nav: readonly { label: string; href: string }[];
  cta: string;
}

interface HeaderProps {
  lang: "en" | "es";
  data: HeaderData;
}

export const Header = ({ lang, data }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navIds = data.nav.map((item) => item.href.replace("#", ""));
  const activeId = useScrollSpy(navIds, 100);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "es" : "en";
    const currentPath = window.location.pathname;
    if (currentPath.includes("/es")) {
      window.location.href = currentPath.replace("/es", "/en");
    } else if (currentPath.includes("/en")) {
      window.location.href = currentPath.replace("/en", "/es");
    } else {
      window.location.href = `/${newLang}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-background/90 backdrop-blur-md shadow-neu"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0 flex items-center">
            <a href={`/${lang}`} className="text-xl font-bold tracking-tight">
              <span className="text-primary">MRG</span> develops
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {data.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeId === item.href.replace("#", "")
                    ? "text-primary shadow-neu-inset bg-background"
                    : "text-foreground hover:text-primary hover:shadow-neu hover:bg-background"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              aria-label="Switch Language"
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{lang}</span>
            </Button>
            <ThemeToggle />
            <Button
              variant="primary"
              size="sm"
              onClick={() => (window.location.href = "#contact")}
            >
              {data.cta}
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-muted bg-background">
          <Container className="py-4 flex flex-col gap-4">
            {data.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-base font-medium py-2 border-b border-muted last:border-0 ${
                  activeId === item.href.replace("#", "")
                    ? "text-primary"
                    : "text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase">{lang}</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  window.location.href = "#contact";
                  setMobileMenuOpen(false);
                }}
              >
                {data.cta}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};
