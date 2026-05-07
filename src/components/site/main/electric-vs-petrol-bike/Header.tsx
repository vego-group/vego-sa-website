import { Sparkles } from "lucide-react";

interface ElectricVsPetrolBikeHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

function ElectricVsPetrolBikeHeader({
  eyebrow,
  title,
  description,
}: ElectricVsPetrolBikeHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-5 py-2 text-sm font-bold text-primary">
        <Sparkles className="size-4 text-secondary" />
        {eyebrow}
      </div>

      <h2 className="mt-6 text-3xl font-black tracking-tight text-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-base leading-8 text-slate-600 lg:text-lg">
        {description}
      </p>
    </div>
  );
}

export default ElectricVsPetrolBikeHeader;
