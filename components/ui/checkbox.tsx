import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn("m-0 size-4 shrink-0 cursor-pointer accent-black", className)}
      {...props}
    />
  );
}
