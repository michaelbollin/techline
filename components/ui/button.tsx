import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const variantClasses = {
  text: "shrink-0 border-0 bg-transparent p-0 text-sm leading-snug whitespace-nowrap text-black hover:opacity-65",
  ghost:
    "border-0 bg-transparent p-0 text-base leading-none text-muted hover:text-black",
  icon: "relative flex size-10 shrink-0 items-center justify-center overflow-visible border-0 bg-transparent text-black transition-opacity duration-150 hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
  chip: "inline-flex items-center gap-2 rounded-full border-0 bg-black px-3 py-1.5 text-sm leading-snug text-white",
  control:
    "flex size-9 items-center justify-center rounded-full border border-black bg-white text-sm text-black transition-all duration-200 hover:scale-105 hover:bg-black hover:text-white",
} as const;

type ButtonVariant = keyof typeof variantClasses;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "text", className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn("cursor-pointer outline-none", variantClasses[variant], className)}
      {...props}
    />
  );
}
