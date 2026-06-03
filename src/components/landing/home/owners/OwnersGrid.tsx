import type { ReactElement } from "react";

import type { OwnerTestimonial } from "@/types/landing/home";
import OwnerTestimonialCard from "./OwnerTestimonialCard";

type OwnersGridProps = {
  testimonials: OwnerTestimonial[];
};

function OwnersGrid({ testimonials }: OwnersGridProps): ReactElement {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:gap-7">
      {testimonials.map((testimonial) => (
        <OwnerTestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}

export default OwnersGrid;
