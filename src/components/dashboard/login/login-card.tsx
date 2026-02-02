import type { ReactNode } from "react";

type LoginCardProps = {
  children: ReactNode;
};

function LoginCard({ children }: LoginCardProps) {
  return (
    <div className="w-full rounded-[32px] border border-white/10 bg-white/10 px-8 py-9 shadow-[0_35px_80px_-45px_rgba(5,15,30,0.85)] backdrop-blur-2xl sm:px-10 sm:py-10">
      {children}
    </div>
  );
}

export { LoginCard };
