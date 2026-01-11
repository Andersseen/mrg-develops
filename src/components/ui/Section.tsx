import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/components/ui/Button";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export const Section = ({
  id,
  className,
  children,
  delay = 0,
}: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className={cn("py-12 md:py-16 lg:py-24", className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};
