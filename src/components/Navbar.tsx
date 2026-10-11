'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu, X, ArrowRight } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore Jammu', href: '/explore' },
    { name: 'Plan Your Journey', href: '/plan' },
    { name: 'Tawi Experience', href: '/tawi-experience' },
    { name: 'Hidden Jammu', href: '/hidden-jammu' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/60 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-10 h-10 rounded-full bg-teal-dark flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 text-accent-green" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold text-xl text-teal-dark tracking-tight leading-none">
                Jammu Beyond Yatra
              </span>
              <span className="text-[10px] font-bold text-charcoal-muted tracking-wider uppercase mt-1">
                HERITAGE & COMMUNITY DISCOVERY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 ${
                    active
                      ? 'bg-emerald-100/90 text-teal-dark font-extrabold shadow-xs'
                      : 'text-charcoal hover:text-teal-dark hover:bg-mint-pale'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Actions: Language Selector + CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSelector />

            <Link
              href="/plan"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-teal-dark hover:bg-teal-accent text-white font-bold text-xs transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <Compass className="w-4 h-4 text-accent-green" />
              <span>Plan My Journey</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger & Language Selector */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-charcoal hover:text-teal-dark hover:bg-mint-pale focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-divider px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  active
                    ? 'bg-emerald-100 text-teal-dark font-bold'
                    : 'text-charcoal hover:bg-mint-pale'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-divider">
            <Link
              href="/plan"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-teal-dark text-white font-bold text-base shadow-md"
            >
              <Compass className="w-5 h-5 text-accent-green" />
              <span>Plan My Journey</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


