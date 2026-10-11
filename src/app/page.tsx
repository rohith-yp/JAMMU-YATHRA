import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import ExperienceModules from '@/components/ExperienceModules';
import DestinationCard from '@/components/DestinationCard';
import MapPreview from '@/components/MapPreview';
import { JAMMU_DESTINATIONS } from '@/lib/destinations';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const featuredDestinations = JAMMU_DESTINATIONS.filter((d) => d.featured).slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <HeroSection />

      {/* 3 Experience Modules */}
      <ExperienceModules />

      {/* Featured Destinations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-dark tracking-tight">
              Featured Jammu Destinations
            </h2>
            <p className="text-sm text-charcoal-muted mt-2 max-w-xl">
              Handpicked historic fortresses, sacred shrines, terraced gardens, and riverfront promenades worth visiting.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white border border-divider hover:border-teal-accent text-teal-dark font-semibold text-sm shadow-xs transition-all self-start md:self-auto"
          >
            <span>Explore All {JAMMU_DESTINATIONS.length} Destinations</span>
            <ArrowRight className="w-4 h-4 text-accent-terracotta" />
          </Link>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-dark">
            Explore Jammu's Heritage Corridor
          </h2>
        </div>
        <MapPreview destinations={JAMMU_DESTINATIONS} />
      </section>

      {/* Closing Call To Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-teal-dark via-teal-accent to-teal-deep text-white p-10 sm:p-14 overflow-hidden shadow-elevated text-center space-y-6">
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Your journey can discover more.
            </h2>

            <p className="text-base sm:text-lg text-mint-light/90 max-w-2xl mx-auto leading-relaxed">
              Tell us your starting location, available duration, and preferences. We’ll generate a tailored Jammu itinerary designed for memorable exploration.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/plan"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent-green hover:bg-emerald-400 text-teal-dark font-extrabold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Plan Your Journey Now
              </Link>
              <Link
                href="/tawi-experience"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base transition-all duration-200"
              >
                Discover Tawi Experience
              </Link>
            </div>
          </div>

          {/* Decorative background circle */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent-green/10 rounded-full blur-2xl pointer-events-none"></div>

        </div>
      </section>

    </div>
  );
}
