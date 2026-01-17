import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "neumorphic";
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
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-95";

  const variants = {
    primary:
      "bg-primary-500 text-white shadow-md hover:bg-primary-600 hover:shadow-lg active:bg-primary-700 active:shadow-inner",
    secondary:
      "bg-secondary text-secondary-foreground shadow-md hover:opacity-90 active:shadow-inner",
    neumorphic:
      "bg-background text-primary shadow-neu hover:shadow-neu-inset active:shadow-neu-inset",
    outline:
      "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20",
    ghost: "hover:bg-black/5 dark:hover:bg-white/10 text-foreground",
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
