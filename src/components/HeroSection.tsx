'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Waves, Landmark, MapPin, Compass } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-mint-pale">
      
      {/* 1. Full-Screen Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/jammu-hero-golden-hour.png"
          className="w-full h-full object-cover object-center"
        >
          <source src="/jammu-hero-video.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Ambient Gradient Overlay for text contrast across all device viewports */}
        <div className="absolute inset-0 bg-gradient-to-r from-mint-pale/95 via-mint-pale/70 to-mint-pale/25 sm:from-mint-pale/90 sm:via-mint-pale/50 sm:to-transparent z-10" />
      </div>

      {/* 2. Main Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 w-full flex-1 flex items-center">
        <div className="max-w-md space-y-4">

          {/* Main Heading */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-teal-dark tracking-tight leading-[1.08] drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
              Discover More of
              <br />
              <span className="relative inline-block text-[#2EB840] text-4xl sm:text-6xl mt-1 drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
                Jammu.
                {/* Underline wave SVG curve matching reference design */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3.5 text-[#2EB840]"
                  viewBox="0 0 240 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 5 12 Q 60 2, 120 12 T 235 12"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <h2 className="text-base sm:text-lg font-extrabold text-charcoal leading-snug pt-2 drop-shadow-[0_2px_6px_rgba(255,255,255,0.95)]">
              Experience royal forts, riverfront trails & vibrant local culture.
            </h2>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-charcoal font-bold leading-relaxed max-w-sm drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)]">
            Tailored itineraries built for your starting location, time, and interests.
          </p>

          {/* Action CTA Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center space-y-2.5 sm:space-y-0 sm:space-x-3">
            <Link
              href="/plan"
              className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full bg-[#2EB840] hover:bg-emerald-400 text-teal-dark font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Plan My Journey</span>
              <ArrowRight className="w-4 h-4 text-teal-dark" />
            </Link>

            <Link
              href="/explore"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-white/95 hover:bg-white backdrop-blur-md border border-teal-dark/30 text-teal-dark font-bold text-xs sm:text-sm transition-all duration-200 shadow-2xs"
            >
              <span>Explore Destinations</span>
              <ArrowRight className="w-4 h-4 text-charcoal" />
            </Link>
          </div>

        </div>
      </div>

      {/* 3. Bottom 3-Column Feature Bar */}
      <div className="relative z-20 w-full pb-6 pt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl border-t border-charcoal/20 pt-4">
            
            {/* Column 1 */}
            <div className="flex items-start space-x-2.5 sm:border-r sm:border-charcoal/20 pr-3">
              <Landmark className="w-4 h-4 text-teal-dark shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-bold text-teal-dark drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">Heritage Discovery</h4>
                <p className="text-[10px] text-charcoal font-semibold leading-tight drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
                  Historic landmarks & legacy
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex items-start space-x-2.5 sm:border-r sm:border-charcoal/20 pr-3">
              <Waves className="w-4 h-4 text-teal-dark shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-bold text-teal-dark drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">Tawi Experiences</h4>
                <p className="text-[10px] text-charcoal font-semibold leading-tight drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
                  Riverfront views & culture
                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex items-start space-x-2.5">
              <Compass className="w-4 h-4 text-teal-dark shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-bold text-teal-dark drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">Personalised Journeys</h4>
                <p className="text-[10px] text-charcoal font-semibold leading-tight drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
                  Plan by time & interests
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
