import type { ReactElement } from "react";

import type { OwnerTestimonial } from "@/types/landing/home";

type OwnerTestimonialCardProps = {
  testimonial: OwnerTestimonial;
};

function OwnerTestimonialCard({
  testimonial,
}: OwnerTestimonialCardProps): ReactElement {
  return (
    <article className="flex min-h-80 flex-col rounded-[2rem] border border-white/10 bg-white/[0.035] ps-8 pe-8 py-9 text-right shadow-[0_28px_80px_rgba(0,0,0,0.2)] backdrop-blur-sm transition duration-300 hover:border-secondary/30 hover:bg-white/[0.055] sm:ps-10 sm:pe-10">
      <div className="text-6xl font-black leading-none text-secondary/80">
        &quot;
      </div>

      <p className="mt-8 flex-1 text-lg font-light leading-9 text-[#d7e0ec] sm:text-xl">
        {testimonial.quote}
      </p>

      <div className="mt-9 h-px bg-white/[0.08]" />

      <footer className="mt-6 flex items-center justify-between gap-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary/35 text-base font-black text-secondary ring-1 ring-secondary/20">
          {testimonial.initials}
        </div>

        <div className="min-w-0 text-end">
          <h3 className="truncate text-base font-black text-white">
            {testimonial.name}
          </h3>
          <p className="mt-1 truncate text-sm font-light text-white/45">
            {testimonial.role}
          </p>
        </div>
      </footer>
    </article>
  );
}

export default OwnerTestimonialCard;
