import Image from "next/image";
import type { ReactElement } from "react";

type NavbarBrandProps = {
  onClick?: () => void;
};

function NavbarBrand({ onClick }: NavbarBrandProps): ReactElement {
  return (
    <button
      type="button"
      aria-label="اذهب إلى الرئيسية"
      className="cursor-pointer"
      onClick={onClick}
    >
      <Image
        src="/images/admin-logo.svg"
        className="h-10 w-20 sm:h-12 sm:w-22"
        alt="VEGO"
        width={90}
        height={90}
        priority
      />
    </button>
  );
}

export default NavbarBrand;
