'use client';

import Link from 'next/link';

interface NavigationItem {
  name: string;
  href: string;
  submenu?: {
    name: string;
    href: string;
  }[];
}

interface MenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
}

export default function MenuPanel({ isOpen, onClose, navigation }: MenuPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-[998] ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg transform transition-transform z-[999] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button 
              onClick={onClose}
              className="text-[#251C6B] hover:text-[#7057A0] transition-colors p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu content */}
          <div className="flex-1 px-8 py-4 overflow-y-auto">
            {navigation.map((item) => (
              item.submenu ? (
                <div key={item.name} className="mb-8">
                  <h2 className="text-xl font-semibold text-[#251C6B] mb-4">{item.name}</h2>
                  <ul className="space-y-4">
                    {item.submenu.map((subitem) => (
                      <li key={subitem.name}>
                        <Link href={subitem.href} className="text-[#7057A0] hover:text-[#251C6B] transition-colors block">
                          {subitem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div key={item.name} className="mb-8">
                  <Link href={item.href} className="text-xl font-semibold text-[#251C6B] hover:text-[#7057A0] transition-colors block">
                    {item.name}
                  </Link>
                </div>
              )
            ))}

            {/* Contact Info */}
            <div className="mt-auto">
              <a 
                href="mailto:contact@tsunaimi.ai"
                className="inline-flex items-center text-[#7057A0] hover:text-[#251C6B] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                contact@tsunaimi.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 