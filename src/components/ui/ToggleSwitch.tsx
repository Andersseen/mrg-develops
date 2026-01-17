import { cn } from "@lib/utils";
import { motion } from "motion/react";
import { useId } from "react";

interface ToggleSwitchProps<T extends string> {
  options: {
    value: T;
    label: React.ReactNode;
  }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export const ToggleSwitch = <T extends string>({
  options,
  value,
  onChange,
  className,
}: ToggleSwitchProps<T>) => {
  const layoutId = useId();

  return (
    <div
      className={cn(
        "flex p-1 bg-background rounded-full shadow-neu-inset items-center relative gap-1",
        className,
      )}
    >
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative z-10 px-3 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 flex items-center justify-center gap-2",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
            type="button"
          >
            {isActive && (
              <motion.div
                layoutId={`active-bg-${layoutId}`}
                className="absolute inset-0 bg-background shadow-neu rounded-full z-[-1]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
