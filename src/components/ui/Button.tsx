import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-95 shadow-neu active:shadow-neu-inset hover:shadow-neu-hover";

  const variants = {
    primary:
      "bg-primary-500 text-white shadow-neu hover:shadow-neu-hover active:shadow-neu-inset",
    secondary:
      "bg-secondary text-secondary-foreground shadow-neu hover:shadow-neu-hover active:shadow-neu-inset",
    outline:
      "bg-background border-2 border-primary-500 text-primary-600 shadow-neu hover:shadow-neu-hover hover:bg-primary-50 active:shadow-neu-inset dark:hover:bg-primary-900/20",
    ghost:
      "bg-transparent text-foreground shadow-none hover:bg-background hover:shadow-neu active:shadow-neu-inset",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant as keyof typeof variants],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
