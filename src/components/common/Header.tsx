"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // For icons
import Image from "next/image";

const navLinks = [
  { name: "Salary Slip", href: "/" },
  { name: "Invoice", href: "/invoice" },
];

export default function Header() {
  const router = useRouter();
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-md p-4 z-50">
      <div className="md:container md:mx-auto flex items-center justify-between">
        {/* Logo */}
        <Image src="/assets/logo.png" alt="Logo" width={170} height={150} />

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`absolute md:relative top-full left-0 w-full bg-white shadow-md md:shadow-none md:flex md:items-center md:w-auto overflow-hidden transition-all duration-500 ease-in-out ${
            menuOpen
              ? "max-h-60 opacity-100"
              : "max-h-0 opacity-0 md:max-h-full md:opacity-100"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8">
            {navLinks.map((link, index) => (
              <li key={index}>
                <div
                  onClick={() => {
                    router.push(link.href);
                    setMenuOpen(false); // Close menu on mobile after clicking
                  }}
                  className={`block py-2 px-3 rounded-md text-lg font-medium cursor-pointer 
                  ${
                    pathName === link.href
                      ? "text-primary"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {link.name}
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:block hidden"></div>
      </div>
    </header>
  );
}
