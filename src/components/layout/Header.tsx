import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { ThemeToggle } from "../ThemeToggle";
import { useScrollSpy } from "../../hooks/useScrollSpy";

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
          ? "bg-[var(--color-background)]/80 backdrop-blur-md border-b border-[var(--color-muted)]"
          : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0 flex items-center">
            <a href={`/${lang}`} className="text-xl font-bold tracking-tight">
              <span className="text-[var(--color-primary)]">MRG</span> develops
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {data.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[var(--color-primary)] ${
                  activeId === item.href.replace("#", "")
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-foreground)]"
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
              className="p-2 text-[var(--color-foreground)]"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--color-muted)] bg-[var(--color-background)]">
          <Container className="py-4 flex flex-col gap-4">
            {data.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-base font-medium py-2 border-b border-[var(--color-muted)] last:border-0 ${
                  activeId === item.href.replace("#", "")
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-foreground)]"
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
