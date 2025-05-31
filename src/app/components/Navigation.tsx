'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'The Journey', path: '/journey' },
    { name: 'Japanese Tradition', path: '/tradition' },
    { name: 'American Commodification', path: '/commodification' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="bg-matcha-dark text-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">抹茶 Matcha</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-matcha-deep"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`hover:text-cream transition-colors ${
                  pathname === item.path ? 'font-bold border-b-2 border-cream' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-matcha-deep">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`hover:text-cream py-2 transition-colors ${
                    pathname === item.path ? 'font-bold border-l-4 pl-2 border-cream' : 'pl-3'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
