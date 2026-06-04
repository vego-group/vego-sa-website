import NavbarBrand from "./NavbarBrand";

function Navbar() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white/20 bg-white/10 shadow-lg shadow-primary/10 backdrop-blur-xl">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3">
        <NavbarBrand />
      </div>
    </header>
  );
}

export default Navbar;
