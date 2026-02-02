import type { ReactNode } from "react";
import type { UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoginSchema } from "@/schemas";

type LoginFieldProps = {
  name: keyof LoginSchema;
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
  icon?: ReactNode;
  register: UseFormRegister<LoginSchema>;
  error?: string;
};

function LoginField({
  name,
  label,
  type,
  placeholder,
  autoComplete,
  icon,
  register,
  error,
}: LoginFieldProps) {
  const inputId = `login-${name}`;

  return (
    <div className="space-y-3">
      <Label
        htmlFor={inputId}
        className="text-[12px] font-semibold uppercase tracking-[0.22em] text-secondary/80"
      >
        {label}
      </Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
          {icon}
        </span>
        <Input
          id={inputId}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className="h-12 rounded-2xl border-white/10 bg-white/5 pl-11 text-white placeholder:text-white/40 focus-visible:border-secondary/60 focus-visible:ring-secondary/30"
          {...register(name)}
        />
      </div>
      {error && <p className="text-xs text-rose-300/90">{error}</p>}
    </div>
  );
}

export { LoginField };
