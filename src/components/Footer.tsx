'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, MapPin, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-teal-dark text-white pt-14 pb-10 border-t border-teal-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simplified 4-Column Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10 text-sm">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-teal-accent flex items-center justify-center text-white">
                <Compass className="w-5 h-5 text-accent-green" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Jammu Beyond Yatra
              </span>
            </div>
            <p className="text-xs text-mint-light/80 leading-relaxed">
              Discover Jammu’s historic palaces, Tawi riverfront walks, Dogra heritage, and vibrant local bazaars beyond traditional pilgrimage stops.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-green">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs text-mint-light/85">
              <li>
                <Link href="/explore" className="hover:text-accent-green transition-colors">
                  Explore All Destinations
                </Link>
              </li>
              <li>
                <Link href="/tawi-experience" className="hover:text-accent-green transition-colors">
                  Tawi Riverfront Experience
                </Link>
              </li>
              <li>
                <Link href="/hidden-jammu" className="hover:text-accent-green transition-colors">
                  Hidden Jammu Heritage
                </Link>
              </li>
              <li>
                <Link href="/plan" className="hover:text-accent-green transition-colors">
                  Plan Custom Itinerary
                </Link>
              </li>
            </ul>
          </div>

          {/* Major Landmarks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-green">
              Featured Circuits
            </h4>
            <ul className="space-y-2 text-xs text-mint-light/85">
              <li>
                <Link href="/destination/mubarak-mandi-palace" className="hover:text-accent-green transition-colors">
                  Mubarak Mandi Palace Complex
                </Link>
              </li>
              <li>
                <Link href="/destination/bahu-fort-temple" className="hover:text-accent-green transition-colors">
                  Bahu Fort & Bawe Wali Mata
                </Link>
              </li>
              <li>
                <Link href="/destination/raghunath-temple-bazaar" className="hover:text-accent-green transition-colors">
                  Raghunath Heritage Bazaar
                </Link>
              </li>
              <li>
                <Link href="/destination/akhnoor-fort-jia-pota" className="hover:text-accent-green transition-colors">
                  Akhnoor Fort & Chenab River
                </Link>
              </li>
            </ul>
          </div>

          {/* Heritage Sites */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-green">
              Heritage Destinations
            </h4>
            <ul className="space-y-2 text-xs text-mint-light/85">
              <li>
                <Link href="/destination/hari-niwas-palace-museum" className="hover:text-accent-green transition-colors">
                  Hari Niwas Palace Museum
                </Link>
              </li>
              <li>
                <Link href="/destination/surinsar-mansar-lakes" className="hover:text-accent-green transition-colors">
                  Surinsar & Mansar Lakes
                </Link>
              </li>
              <li>
                <Link href="/destination/peer-kho-cave-temple" className="hover:text-accent-green transition-colors">
                  Peer Kho Cave Shrine
                </Link>
              </li>
              <li>
                <Link href="/destination/suchetgarh-heritage-border-post" className="hover:text-accent-green transition-colors">
                  Suchetgarh Heritage Border
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-mint-light/65 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} Jammu Beyond Yatra. Built for Jammu Tourism & Heritage Preservation.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>Made for Jammu Tourism</span>
              <Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1 text-mint-light hover:text-white transition-colors border border-white/20 px-2.5 py-1 rounded-md text-[11px]"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

