import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JAMMU_DESTINATIONS } from '@/lib/destinations';
import DestinationCard from '@/components/DestinationCard';
import MapPreview from '@/components/MapPreview';
import {
  MapPin,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Compass,
  Info,
  Ticket,
  Sun,
  Waves,
  Heart
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return JAMMU_DESTINATIONS.map((dest) => ({
    slug: dest.slug,
  }));
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = JAMMU_DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  // Related destinations in same category or matching interests
  const relatedDestinations = JAMMU_DESTINATIONS.filter(
    (d) => d.id !== destination.id && (d.category === destination.category || d.isTawiExperience === destination.isTawiExperience)
  ).slice(0, 3);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/explore"
          className="inline-flex items-center space-x-2 text-xs font-bold text-teal-dark hover:text-teal-accent bg-white px-4 py-2 rounded-xl border border-divider shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-accent-terracotta" />
          <span>Back to Explore Jammu</span>
        </Link>

        <span className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider">
          {destination.category} Circuit
        </span>
      </div>

      {/* Hero Showcase Card */}
      <div className="bg-white rounded-3xl border border-divider shadow-card overflow-hidden">
        <div className="relative h-[380px] sm:h-[480px] w-full">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-dark via-teal-dark/40 to-transparent" />

          {/* Top Floating Badges */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-teal-dark shadow-sm">
              {destination.category}
            </span>
            {destination.isTawiExperience && (
              <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-blue-900/90 text-white shadow-sm flex items-center space-x-1.5">
                <Waves className="w-3.5 h-3.5 text-cyan-300" />
                <span>Tawi Experience</span>
              </span>
            )}
            {destination.isVerified && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-900/90 text-accent-green shadow-sm flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Heritage Site</span>
              </span>
            )}
          </div>

          {/* Bottom Title Container */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center space-x-2 text-xs text-mint-light/90 font-medium">
              <MapPin className="w-4 h-4 text-accent-green" />
              <span>{destination.locationLabel}</span>
              <span>•</span>
              <Clock className="w-4 h-4 text-mint-light" />
              <span>Est. Visit ~{destination.estimatedVisitMinutes} mins</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {destination.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Detailed Overview */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Detailed Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-divider shadow-subtle space-y-4">
            <h2 className="text-2xl font-bold text-teal-dark">Overview</h2>
            <p className="text-base text-charcoal/85 leading-relaxed">
              {destination.detailedOverview}
            </p>
          </div>

          {/* Cultural & Heritage Significance */}
          <div className="bg-mint-pale rounded-3xl p-6 sm:p-8 border border-teal-accent/20 space-y-3">
            <h3 className="text-base font-bold text-teal-dark flex items-center space-x-2">
              <Compass className="w-5 h-5 text-teal-accent" />
              <span>Heritage & Cultural Significance</span>
            </h3>
            <p className="text-sm font-medium text-charcoal/90 leading-relaxed">
              {destination.significance}
            </p>
          </div>

          {/* Practical Visitor Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-divider shadow-subtle space-y-6">
            <h3 className="text-xl font-bold text-teal-dark">Practical Visitor Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl bg-mint-pale/60 border border-divider space-y-1">
                <span className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider flex items-center space-x-1">
                  <Sun className="w-3.5 h-3.5 text-teal-accent" />
                  <span>Best Time to Visit</span>
                </span>
                <p className="text-xs font-bold text-teal-dark">
                  {destination.bestTimeToVisit || 'Morning or Evening'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-mint-pale/60 border border-divider space-y-1">
                <span className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider flex items-center space-x-1">
                  <Ticket className="w-3.5 h-3.5 text-teal-accent" />
                  <span>Entry Fee</span>
                </span>
                <p className="text-xs font-bold text-teal-dark">
                  {destination.entryFee || 'Free entry'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-mint-pale/60 border border-divider space-y-1">
                <span className="text-xs font-semibold text-charcoal-muted uppercase tracking-wider flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-teal-accent" />
                  <span>Avg Duration</span>
                </span>
                <p className="text-xs font-bold text-teal-dark">
                  {destination.estimatedVisitMinutes} minutes
                </p>
              </div>

            </div>

            {destination.practicalInfo && (
              <div className="p-4 rounded-2xl bg-teal-dark/5 border border-teal-dark/10 flex items-start space-x-3 text-xs text-charcoal/85">
                <Info className="w-5 h-5 text-teal-accent shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  <strong>Visitor Advice:</strong> {destination.practicalInfo}
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Right Sidebar Actions */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-teal-dark text-white rounded-3xl p-6 shadow-card space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-accent-green">
                Journey Planning
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Visit {destination.name}
              </h3>
              <p className="text-xs text-mint-light/80 mt-2 leading-relaxed">
                Add this destination into your custom Jammu itinerary based on your available time and starting point.
              </p>
            </div>

            <Link
              href={`/plan?start=${encodeURIComponent(destination.name)}`}
              className="w-full py-3.5 px-5 rounded-xl bg-accent-green hover:bg-emerald-400 text-teal-dark font-extrabold text-sm transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Compass className="w-4 h-4" />
              <span>Include in My Jammu Itinerary</span>
            </Link>

            <div className="pt-3 border-t border-white/15 text-[11px] text-mint-light/70 space-y-1">
              <p>📍 Location: {destination.locationLabel}</p>
              <p>📍 Coordinates: {destination.latitude}° N, {destination.longitude}° E</p>
            </div>
          </div>

          <MapPreview destinations={[destination]} activeDestinationId={destination.id} />

        </div>

      </div>

      {/* Related Destinations Section */}
      {relatedDestinations.length > 0 && (
        <div className="pt-10 border-t border-divider space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-teal-dark">
              Related Jammu Attractions
            </h3>
            <Link
              href="/explore"
              className="text-xs font-bold text-teal-accent hover:underline"
            >
              View All Destinations
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedDestinations.map((rel) => (
              <DestinationCard key={rel.id} destination={rel} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
