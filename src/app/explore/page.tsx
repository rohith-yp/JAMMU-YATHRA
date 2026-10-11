'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { JAMMU_DESTINATIONS } from '@/lib/destinations';
import { Destination } from '@/lib/types';
import {
  Search,
  X,
  LayoutGrid,
  List,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  AlertCircle,
  RefreshCw,
  Landmark,
  Compass,
  Waves,
  Filter
} from 'lucide-react';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const categories = useMemo(() => {
    return [
      'All',
      'Heritage',
      'Nature',
      'Pilgrimage',
      'Culture',
      'Local Experiences',
      'Riverfront'
    ];
  }, []);

  const filteredDestinations = useMemo(() => {
    return JAMMU_DESTINATIONS.filter((dest) => {
      // Category check
      const matchesCategory =
        selectedCategory === 'All' || dest.category === selectedCategory;

      // Search query check
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        dest.name.toLowerCase().includes(query) ||
        dest.description.toLowerCase().includes(query) ||
        dest.detailedOverview.toLowerCase().includes(query) ||
        dest.locationLabel.toLowerCase().includes(query) ||
        dest.category.toLowerCase().includes(query) ||
        dest.interests.some((i) => i.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleSaveDestination = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Heritage':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'Pilgrimage':
        return 'bg-emerald-100 text-emerald-900 border-emerald-200';
      case 'Nature':
        return 'bg-teal-100 text-teal-900 border-teal-200';
      case 'Riverfront':
        return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'Local Experiences':
        return 'bg-rose-100 text-rose-900 border-rose-200';
      default:
        return 'bg-mint-pale text-teal-dark border-divider';
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header Banner with Featured Jammu Vista Image */}
      <section className="relative bg-gradient-to-r from-mint-pale via-white to-mint-pale py-10 sm:py-12 px-6 sm:px-10 rounded-3xl border border-divider overflow-hidden shadow-subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-teal-dark tracking-tight leading-tight">
              Explore Jammu.
            </h1>
            <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-medium max-w-xl">
              Discover historic landmarks, riverfront experiences, natural retreats and cultural places across Jammu.
            </p>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden shadow-md border-2 border-white">
              <Image
                src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80"
                alt="Jammu Heritage Vista"
                fill
                priority
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white flex items-center space-x-1.5 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-accent-green shrink-0" />
                <span>Mubarak Mandi & Tawi Riverfront, Jammu</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Discovery Summary Stats */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-divider shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-divider">
          
          <div className="flex items-center space-x-3 pt-2 sm:pt-0">
            <Landmark className="w-5 h-5 text-teal-accent shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-charcoal-light uppercase tracking-wider block">Destinations</span>
              <span className="text-sm font-extrabold text-teal-dark">{JAMMU_DESTINATIONS.length} Verified Landmarks</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-3 sm:pt-0 sm:pl-6">
            <Compass className="w-5 h-5 text-teal-accent shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-charcoal-light uppercase tracking-wider block">Experience Categories</span>
              <span className="text-sm font-extrabold text-teal-dark">6 Regional Circuits</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-3 sm:pt-0 sm:pl-6">
            <Waves className="w-5 h-5 text-teal-accent shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-charcoal-light uppercase tracking-wider block">One Region, Many Stories</span>
              <span className="text-sm font-extrabold text-teal-dark">Dogra Cultural Heritage</span>
            </div>
          </div>

        </div>
      </section>

      {/* Search Bar & Category Controls */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-divider shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-charcoal-light absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by landmark name, area, or keywords (e.g., Mubarak Mandi, Bahu Fort, Tawi, Saffron)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-divider focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/20 text-sm text-charcoal outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-teal-dark p-1 rounded-full"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center space-x-1 border border-divider rounded-xl p-1 bg-mint-pale/50 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                viewMode === 'grid'
                  ? 'bg-teal-dark text-white shadow-2xs'
                  : 'text-charcoal-muted hover:text-teal-dark'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                viewMode === 'list'
                  ? 'bg-teal-dark text-white shadow-2xs'
                  : 'text-charcoal-muted hover:text-teal-dark'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

        </div>

        {/* Category Filters Bar */}
        <div className="pt-3 border-t border-divider">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
            <div className="flex items-center space-x-1 text-xs font-bold text-charcoal-muted shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-teal-accent" />
              <span className="uppercase text-[11px]">Filter:</span>
            </div>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-teal-dark text-white shadow-2xs'
                      : 'bg-white hover:bg-mint-pale text-charcoal border border-divider'
                  }`}
                >
                  {cat === 'All' ? 'All Destinations' : cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Status Summary Bar */}
      <div className="flex items-center justify-between text-xs text-charcoal-muted px-1">
        <span>
          Showing <strong>{filteredDestinations.length}</strong> of <strong>{JAMMU_DESTINATIONS.length}</strong> verified destinations
        </span>

        {(searchQuery || selectedCategory !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="inline-flex items-center space-x-1 text-xs font-bold text-teal-accent hover:underline"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Destination Cards Display with High-Quality Images */}
      {filteredDestinations.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }
        >
          {filteredDestinations.map((destination) => {
            const isSaved = savedIds.includes(destination.id);

            return (
              <article
                key={destination.id}
                className={`bg-white rounded-2xl border border-divider shadow-subtle hover:shadow-card transition-all overflow-hidden flex flex-col justify-between group ${
                  viewMode === 'list' ? 'md:flex-row md:items-stretch' : ''
                }`}
              >
                {/* Destination Image Container */}
                <div
                  className={`relative bg-teal-dark/10 overflow-hidden ${
                    viewMode === 'list' ? 'h-60 md:h-auto md:w-80 shrink-0' : 'h-52 w-full'
                  }`}
                >
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/80 via-transparent to-transparent opacity-85" />

                  {/* Category & Verification Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md border shadow-xs ${getCategoryColor(
                        destination.category
                      )}`}
                    >
                      {destination.category}
                    </span>
                  </div>

                  {destination.isVerified && (
                    <div
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-1.5 rounded-full text-teal-dark shadow-sm"
                      title="Verified Jammu Cultural Site"
                    >
                      <ShieldCheck className="w-4 h-4 text-teal-accent" />
                    </div>
                  )}

                  {/* Bookmark Button over image */}
                  <button
                    onClick={(e) => toggleSaveDestination(destination.id, e)}
                    className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                      isSaved
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-white/80 text-teal-dark hover:bg-white'
                    }`}
                    title={isSaved ? 'Remove from saved' : 'Save destination'}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Card Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-charcoal-muted">
                      <span className="flex items-center space-x-1 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-accent-terracotta shrink-0" />
                        <span>{destination.locationLabel}</span>
                      </span>
                      <span className="flex items-center space-x-1 font-semibold bg-mint-pale px-2 py-0.5 rounded text-[11px]">
                        <Clock className="w-3 h-3 text-teal-accent" />
                        <span>~{destination.estimatedVisitMinutes} mins</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-teal-dark group-hover:text-teal-accent transition-colors leading-tight">
                      {destination.name}
                    </h3>

                    <p className="text-xs text-charcoal/80 leading-relaxed line-clamp-2 font-normal">
                      {destination.description}
                    </p>
                  </div>

                  {/* Footer Details & Action Link */}
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
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-divider space-y-4 max-w-md mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-teal-dark">No destinations found</h3>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            We couldn't find any destinations matching "{searchQuery}" under {selectedCategory}. Try broadening your search query or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-5 py-2.5 rounded-xl bg-teal-dark hover:bg-teal-accent text-white text-xs font-bold transition-colors shadow-xs"
          >
            Show All Destinations
          </button>
        </div>
      )}

    </div>
  );
}
