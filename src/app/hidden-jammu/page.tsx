'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { JAMMU_DESTINATIONS } from '@/lib/destinations';
import { Destination } from '@/lib/types';
import {
  Landmark,
  Utensils,
  Store,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function HiddenJammuPage() {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  // Filter hidden Jammu destinations from dataset
  const allHiddenDestinations = useMemo(() => {
    return JAMMU_DESTINATIONS.filter((d) => d.isHiddenJammu);
  }, []);

  // Filtered hidden destinations based on selected category tab
  const filteredHiddenDestinations = useMemo(() => {
    if (activeCategoryFilter === 'All') return allHiddenDestinations;
    if (activeCategoryFilter === 'Heritage & Architecture') {
      return allHiddenDestinations.filter(
        (d) => d.category === 'Heritage' || d.category === 'Pilgrimage'
      );
    }
    if (activeCategoryFilter === 'Food & Regional Traditions') {
      return allHiddenDestinations.filter(
        (d) => d.category === 'Culture' || d.category === 'Local Experiences'
      );
    }
    if (activeCategoryFilter === 'Markets & Artisans') {
      return allHiddenDestinations.filter(
        (d) => d.category === 'Local Experiences' || d.interests.includes('Local markets')
      );
    }
    return allHiddenDestinations;
  }, [allHiddenDestinations, activeCategoryFilter]);

  const culturalCategories = [
    {
      id: 'Heritage & Architecture',
      title: 'Heritage & Architecture',
      description: 'Explore historic buildings, architectural details and heritage places connected to Jammu\'s past.',
      icon: Landmark,
      accentColor: 'border-amber-700/30 text-amber-900 bg-amber-50'
    },
    {
      id: 'Food & Regional Traditions',
      title: 'Food & Regional Traditions',
      description: 'Discover regional cuisine, traditional food practices and local culinary heritage.',
      icon: Utensils,
      accentColor: 'border-emerald-700/30 text-emerald-900 bg-emerald-50'
    },
    {
      id: 'Markets & Artisans',
      title: 'Markets & Artisans',
      description: 'Find local markets, traditional crafts and artisans whose work contributes to the region\'s cultural identity.',
      icon: Store,
      accentColor: 'border-rose-700/30 text-rose-900 bg-rose-50'
    }
  ];

  return (
    <div className="py-10 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* SECTION A — EDITORIAL HERO WITH FEATURED HERITAGE PHOTO */}
      <section className="bg-teal-dark text-white rounded-3xl p-8 sm:p-12 border-l-4 sm:border-l-8 border-accent-terracotta shadow-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Discover the Hidden Side of Jammu.
            </h1>

            <p className="text-base sm:text-lg text-mint-light/90 leading-relaxed font-normal pt-1">
              Explore the heritage, traditions, local crafts and cultural places that give Jammu its character.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-5">
              <Link
                href="/plan?preference=Cultural+focus"
                className="inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-accent-green hover:bg-emerald-400 text-teal-dark font-extrabold text-sm shadow-md transition-all"
              >
                <span>Plan a Cultural Journey</span>
              </Link>

              <a
                href="#hidden-locations"
                className="inline-flex items-center justify-center space-x-1.5 text-sm font-semibold text-mint-light hover:text-white transition-colors"
              >
                <span>Explore Heritage Locations</span>
                <ArrowRight className="w-4 h-4 text-accent-terracotta" />
              </a>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden shadow-elevated border-2 border-white/20 bg-teal-dark/20">
              <SafeImage
                src="https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1000&q=80"
                alt="Akhnoor Fort & Chenab River, Jammu"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-dark via-teal-dark/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                <p className="text-xs font-bold text-white flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-accent-terracotta shrink-0" />
                  <span>Akhnoor Coronation Fort & Jia Pota Ghat</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION B — CULTURAL DISCOVERY CATEGORIES */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-dark">
            Explore Jammu's Cultural Identity
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl leading-relaxed">
            Discover the stories, skills and traditions connected to the region.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {culturalCategories.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = activeCategoryFilter === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategoryFilter(isSelected ? 'All' : cat.id);
                  const el = document.getElementById('hidden-locations');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-left rounded-2xl p-6 border transition-all duration-200 space-y-4 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-teal-dark text-white border-teal-dark shadow-subtle ring-2 ring-teal-accent/30'
                    : 'bg-white hover:bg-mint-pale/60 text-charcoal border-divider shadow-2xs'
                }`}
              >
                <div className="space-y-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                      isSelected ? 'bg-teal-accent/40 text-accent-green border-teal-accent' : cat.accentColor
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-teal-dark'}`}>
                    {cat.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-mint-light/90' : 'text-charcoal-muted'}`}>
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-divider/40 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-accent-green' : 'text-teal-accent'}>
                    {isSelected ? 'Active Filter' : 'Filter Locations'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-accent-green' : 'text-accent-terracotta'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION C & D — HIDDEN JAMMU LOCATIONS WITH IMAGES */}
      <section id="hidden-locations" className="space-y-8 pt-4">
        
        {/* Header & Filter Controls */}
        <div className="space-y-4 border-b border-divider pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-dark">
                Hidden Jammu Heritage Locations
              </h2>
              <p className="text-sm text-charcoal-muted">
                Discover places and experiences that offer a closer connection to Jammu's heritage and culture.
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-teal-dark bg-mint-pale px-3 py-1.5 rounded-full border border-divider">
                Showing {filteredHiddenDestinations.length} {filteredHiddenDestinations.length === 1 ? 'location' : 'locations'}
              </span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
            <button
              onClick={() => setActiveCategoryFilter('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategoryFilter === 'All'
                  ? 'bg-teal-dark text-white shadow-2xs'
                  : 'bg-white text-charcoal border border-divider hover:bg-mint-pale'
              }`}
            >
              All Hidden Spots ({allHiddenDestinations.length})
            </button>

            {culturalCategories.map((cat) => {
              const isSelected = activeCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-teal-dark text-white shadow-2xs'
                      : 'bg-white text-charcoal border border-divider hover:bg-mint-pale'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}

            {activeCategoryFilter !== 'All' && (
              <button
                onClick={() => setActiveCategoryFilter('All')}
                className="inline-flex items-center space-x-1 text-xs font-semibold text-teal-accent hover:underline ml-2"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Location Editorial Cards Grid with High-Quality Photos */}
        {filteredHiddenDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredHiddenDestinations.map((destination) => (
              <article
                key={destination.id}
                className="bg-white rounded-2xl border border-divider hover:border-teal-accent/60 shadow-subtle hover:shadow-card transition-all overflow-hidden flex flex-col justify-between group"
              >
                {/* Destination Image Container */}
                <div className="relative h-56 w-full bg-teal-dark/10 overflow-hidden">
                  <SafeImage
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/80 via-transparent to-transparent opacity-85" />

                  {/* Category & Verification Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-teal-dark shadow-xs border border-white">
                      {destination.category}
                    </span>
                  </div>

                  {destination.isVerified && (
                    <div
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-1.5 rounded-full text-teal-dark shadow-sm"
                      title="Verified Hidden Site"
                    >
                      <ShieldCheck className="w-4 h-4 text-teal-accent" />
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-accent-green shrink-0" />
                    <span className="truncate">{destination.locationLabel}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-charcoal-muted">
                      <span className="flex items-center space-x-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-teal-accent" />
                        <span>~{destination.estimatedVisitMinutes} mins visit</span>
                      </span>
                      <span className="text-charcoal-light">
                        {destination.bestTimeToVisit ? destination.bestTimeToVisit.split('(')[0] : 'Year-round'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-teal-dark group-hover:text-teal-accent transition-colors leading-tight">
                      {destination.name}
                    </h3>

                    <p className="text-xs text-charcoal/85 leading-relaxed font-normal">
                      {destination.description}
                    </p>

                    {destination.significance && (
                      <div className="p-3.5 rounded-xl bg-mint-pale/70 border border-teal-accent/20 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-accent block">
                          Cultural Significance
                        </span>
                        <p className="text-xs font-medium text-teal-dark leading-snug">
                          {destination.significance}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Link */}
                  <div className="pt-3 border-t border-divider/60 flex items-center justify-between text-xs font-semibold">
                    <span className="text-charcoal-light">
                      {destination.interests[0] || destination.category}
                    </span>

                    <Link
                      href={`/destination/${destination.slug}`}
                      className="inline-flex items-center space-x-1 font-bold text-teal-dark hover:text-teal-accent group-hover:translate-x-0.5 transition-all"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-accent-terracotta" />
                    </Link>
                  </div>
                </div>

              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-divider space-y-3 max-w-md mx-auto shadow-2xs">
            <AlertCircle className="w-6 h-6 text-rose-600 mx-auto" />
            <h3 className="text-base font-bold text-teal-dark">No locations found</h3>
            <p className="text-xs text-charcoal-muted">
              No hidden destinations match the selected cultural category filter.
            </p>
            <button
              onClick={() => setActiveCategoryFilter('All')}
              className="px-4 py-2 rounded-xl bg-teal-dark text-white text-xs font-semibold"
            >
              Show All Hidden Spots
            </button>
          </div>
        )}

      </section>

      {/* SECTION E — CLOSING CALL TO ACTION */}
      <section className="bg-teal-dark text-white p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-card">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          Every Place Has a Story.
        </h2>
        <p className="text-sm sm:text-base text-mint-light/90 max-w-xl mx-auto leading-relaxed">
          Plan a journey that takes you closer to Jammu's heritage, traditions and local experiences.
        </p>
        <div className="pt-2">
          <Link
            href="/plan"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-accent-green hover:bg-emerald-400 text-teal-dark font-extrabold text-sm shadow-md transition-all"
          >
            <span>Plan My Journey</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
