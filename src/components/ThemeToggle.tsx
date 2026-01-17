import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { ToggleSwitch } from "@components/ui/ToggleSwitch";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setTheme(isDark ? "dark" : "light");
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setTheme(newTheme);
  };

  return (
    <ToggleSwitch
      value={theme}
      onChange={handleThemeChange}
      options={[
        { value: "light", label: <Sun className="h-4 w-4" /> },
        { value: "dark", label: <Moon className="h-4 w-4" /> },
      ]}
    />
  );
};
