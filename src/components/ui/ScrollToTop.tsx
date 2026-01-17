import { cn } from "@lib/utils";
import { ChevronUp } from "lucide-react";
import { motion, useMotionValue, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const hasScrolledPastThreshold = currentScrollY > 200;

      const isScrollingDown = currentScrollY > lastScrollY.current;

      if (hasScrolledPastThreshold && isScrollingDown) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX / 2);
    y.set(distanceY / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 pointer-events-none"
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <motion.button
        ref={ref}
        onClick={scrollToTop}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={cn(
          "pointer-events-auto",
          "flex items-center justify-center w-14 h-14 rounded-full",
          "bg-primary text-primary-foreground shadow-neu shadow-primary/20",
          "hover:scale-110 active:scale-95 transition-transform duration-200",
          "cursor-pointer",
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-12 h-12" />
      </motion.button>
    </motion.div>
  );
};
