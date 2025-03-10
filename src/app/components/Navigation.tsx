'use client';

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import MenuPanel from "./MenuPanel";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Logo variant="symbol" />
              </Link>
            </div>
            <div className="flex items-center">
              {/* Search Icon */}
              <button className="text-[#251C6B] hover:text-[#7057A0] transition-colors p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
              {/* Vertical Divider */}
              <div className="w-px h-6 bg-[#251C6B] opacity-20 mx-2"></div>
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