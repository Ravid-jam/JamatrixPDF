"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const navLinks = [
  { name: "Salary Slip", href: "/", active: true },
  { name: "Invoice", href: "/invoice" },
];

export default function Header() {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div className="fixed top-0 w-full bg-white shadow-md p-4">
      <div className="flex items-center container mx-auto">
        <img src="/assets/logo.png" alt="Logo" className="h-12 w-auto" />
        <ul className="font-medium flex flex-1 justify-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
          {navLinks.map((link, index) => (
            <li key={index}>
              <div
                onClick={() => router.push(link.href)}
                className={`block py-2 px-3 rounded-sm md:p-0 text-lg font-medium cursor-pointer  
              ${
                pathName === link.href
                  ? "text-primary"
                  : "text-gray-700  md:hover:text-primary"
              }`}
                aria-current={link.active ? "page" : undefined}
              >
                {link.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
