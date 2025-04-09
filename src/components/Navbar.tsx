import { useState } from "react";
import ExitIcon from "./icons/ExitIcon";
import NavLinks from "./NavLinks";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-20 bg-cream w-full flex items-center justify-between px-5 mb-6 relative overflow-hidden">
      {!menuOpen && (
        <p className="text-rose font-semibold text-4xl">Catlover</p>
      )}

      {/* Desktop Nav */}
      <div className="gap-4 mr-6 hidden md:flex">
        <NavLinks />
      </div>

      {/* Hamburger icon */}
      {!menuOpen && (
        <div
          className="md:hidden flex flex-col justify-center items-center gap-[5px] ml-auto cursor-pointer z-20"
          onClick={() => setMenuOpen(true)}
        >
          <span className="block w-6 h-[2px] bg-rose transition-all duration-300"></span>
          <span className="block w-6 h-[2px] bg-rose transition-all duration-300"></span>
          <span className="block w-6 h-[2px] bg-rose transition-all duration-300"></span>
        </div>
      )}

      {/* Mobile Nav Menu */}
      <div
        className={`absolute top-0 left-0 w-full h-20 bg-[#fdf6f0] flex items-center justify-center gap-8 md:hidden z-10 transition-all duration-300 ease-in-out transform ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <NavLinks />

        {/* Close icon */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-rose text-3xl font-bold transition-opacity duration-300"
        >
          <ExitIcon fill="#cf6785" />
        </button>
      </div>
    </div>
  );
}
