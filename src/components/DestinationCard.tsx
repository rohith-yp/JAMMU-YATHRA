'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, ArrowRight, ShieldCheck, Waves } from 'lucide-react';
import { Destination } from '@/lib/types';

interface DestinationCardProps {
  destination: Destination;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80';

export default function DestinationCard({ destination }: DestinationCardProps) {
  const [imgSrc, setImgSrc] = useState(destination.image);

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
    <div className="bg-white rounded-2xl border border-divider shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1">
      
      {/* Thumbnail Image Container */}
      <div className="relative h-52 w-full bg-teal-dark/10 overflow-hidden">
        <Image
          src={imgSrc}
          alt={destination.name}
          fill
          unoptimized
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/80 via-transparent to-transparent opacity-85" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border shadow-xs ${getCategoryColor(destination.category)}`}>
            {destination.category}
          </span>
          {destination.isTawiExperience && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-blue-900/90 text-white shadow-xs flex items-center space-x-1">
              <Waves className="w-3 h-3 text-cyan-300" />
              <span>Tawi Feature</span>
            </span>
          )}
        </div>

        {destination.isVerified && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-1.5 rounded-full text-teal-dark shadow-sm" title="Verified Jammu Cultural Site">
            <ShieldCheck className="w-4 h-4 text-teal-accent" />
          </div>
        )}

        {/* Location tag over image */}
        <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs font-medium">
          <span className="flex items-center space-x-1 truncate max-w-[70%]">
            <MapPin className="w-3.5 h-3.5 text-accent-green shrink-0" />
            <span className="truncate">{destination.locationLabel}</span>
          </span>
          <span className="flex items-center space-x-1 bg-teal-dark/70 px-2 py-0.5 rounded text-[11px] backdrop-blur-xs">
            <Clock className="w-3 h-3 text-mint-light" />
            <span>~{destination.estimatedVisitMinutes} mins</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-teal-dark group-hover:text-teal-accent transition-colors line-clamp-1">
            {destination.name}
          </h3>
          <p className="text-xs text-charcoal/80 leading-relaxed line-clamp-2">
            {destination.description}
          </p>
        </div>

        {/* Footer Details & Action Link */}
        <div className="pt-3 border-t border-divider/60 flex items-center justify-between text-xs font-medium">
          <span className="text-charcoal-light">
            {destination.interests[0] || destination.category}
          </span>

          <Link
            href={`/destination/${destination.slug}`}
            className="inline-flex items-center space-x-1 font-semibold text-teal-dark hover:text-teal-accent group-hover:translate-x-0.5 transition-all"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent-terracotta" />
          </Link>
        </div>
      </div>

    </div>
  );
}

