import Image from "next/image";
import Link from "next/link";

function NavbarBrand() {
  return (
    <Link href="/landing">
      <Image
        src="/images/admin-logo.svg"
        className="h-10 w-20 sm:h-12 sm:w-22"
        alt="VEGO"
        width={90}
        height={90}
        priority
      />
    </Link>
  );
}

export default NavbarBrand;
