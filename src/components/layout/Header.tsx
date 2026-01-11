import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { ThemeToggle } from "../ThemeToggle";

interface HeaderProps {
  lang: "en" | "es";
}

const navItems = [
  { label: { en: "About Us", es: "Quiénes Somos" }, href: "#about" },
  { label: { en: "Services", es: "Qué Hacemos" }, href: "#services" },
  // { label: { en: 'Projects', es: 'Proyectos' }, href: '#projects' }, // Hidden for now
  // { label: { en: 'CIO', es: 'CIO' }, href: '#cio' }, // Hidden
  // { label: { en: 'Blog', es: 'Blog' }, href: '#blog' }, // Hidden
  { label: { en: "Contact", es: "Contacto" }, href: "#contact" },
];

export const Header = ({ lang }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    // Simple replacement logic for now
    if (currentPath.includes("/es")) {
      window.location.href = currentPath.replace("/es", "/en");
    } else if (currentPath.includes("/en")) {
      window.location.href = currentPath.replace("/en", "/es");
    } else {
      // Default to ES if at root (should be handled by middleware/redirects)
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
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href={`/${lang}`} className="text-xl font-bold tracking-tight">
              <span className="text-[var(--color-primary)]">MRG</span> develops
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors"
              >
                {item.label[lang]}
              </a>
            ))}
          </nav>

          {/* Actions */}
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
              {lang === "en" ? "Get in Touch" : "Contáctanos"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--color-muted)] bg-[var(--color-background)]">
          <Container className="py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-medium py-2 border-b border-[var(--color-muted)] last:border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label[lang]}
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
                {lang === "en" ? "Get in Touch" : "Contáctanos"}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};
