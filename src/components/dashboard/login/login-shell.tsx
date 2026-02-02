import type { ReactNode } from "react";

type LoginShellProps = {
  children: ReactNode;
};

function LoginShell({ children }: LoginShellProps) {
  return (
    <section
      dir="ltr"
      className="relative min-h-svh overflow-hidden bg-primary text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-950 via-primary to-emerald-950" />
      </div>

      <div className="relative flex min-h-svh w-full items-center justify-center px-6">
        {children}
      </div>
    </section>
  );
}

export { LoginShell };
