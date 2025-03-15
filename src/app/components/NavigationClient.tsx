'use client';

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import MenuPanel from "./MenuPanel";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavigationClientProps {
  locale: string;
}

export default function NavigationClient({ locale }: NavigationClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg fixed w-full z-40 border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Logo variant="symbol" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher locale={locale} />
              {/* Menu Icon */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="text-[#251C6B] hover:text-[#7057A0] transition-colors p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <MenuPanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
} 