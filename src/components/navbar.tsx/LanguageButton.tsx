import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { ReactElement } from "react";
import { Button } from "../ui/button";

type LanguageButtonProps = {
  className: string;
  onClick?: () => void;
};

export default function LanguageButton({
  className,
  onClick,
}: LanguageButtonProps): ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const nextLocale = locale === "ar" ? "en" : "ar";
  const t = useTranslations("nav");
  const handleLocaleToggle = (): void => {
    router.replace(pathname, { locale: nextLocale });
  };
  const handleClick = onClick ?? handleLocaleToggle;

  return (
    <Button type="button" className={className} onClick={handleClick}>
      <Globe className="size-4" />
      {t("lang")}
    </Button>
  );
}
