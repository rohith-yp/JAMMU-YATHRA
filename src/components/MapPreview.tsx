'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Destination } from '@/lib/types';
import { Compass, MapPin, ExternalLink } from 'lucide-react';

// Dynamically import RealLeafletMap with SSR disabled to ensure client-only Leaflet initialization
const RealLeafletMap = dynamic(() => import('@/components/RealLeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full rounded-2xl bg-mint-pale flex flex-col items-center justify-center space-y-3 border border-divider">
      <div className="w-10 h-10 rounded-full bg-teal-dark text-accent-green flex items-center justify-center animate-bounce">
        <Compass className="w-6 h-6" />
      </div>
      <span className="text-xs font-bold text-teal-dark">Loading OpenStreetMap Jammu Tiles...</span>
    </div>
  ),
});

interface MapPreviewProps {
  destinations: Destination[];
  activeDestinationId?: string;
}

export default function MapPreview({ destinations, activeDestinationId }: MapPreviewProps) {
  const [selectedDestId, setSelectedDestId] = useState<string>(
    activeDestinationId || (destinations[0] ? destinations[0].id : '')
  );

  const selectedDest = destinations.find((d) => d.id === selectedDestId) || destinations[0];

  return (
    <div className="bg-white rounded-3xl border border-divider shadow-card overflow-hidden">
      
      {/* Header */}
      <div className="p-4 sm:p-5 bg-teal-dark text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Compass className="w-5 h-5 text-accent-green shrink-0" />
          <div>
            <h3 className="font-bold text-base text-white leading-tight">Jammu OpenStreetMap Interactive Map</h3>
            <p className="text-[11px] text-mint-light/80">Real GPS coordinates with OpenStreetMap tile layers</p>
          </div>
        </div>
      </div>

      {/* Real Leaflet OpenStreetMap Container */}
      <div className="p-4 bg-mint-pale/50 space-y-4">
        
        {/* Destination Quick Selector Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-bold text-teal-dark shrink-0 uppercase tracking-wider text-[10px]">
            Pins ({destinations.length}):
          </span>
          {destinations.map((dest) => {
            const isSelected = dest.id === selectedDestId;
            return (
              <button
                key={dest.id}
                onClick={() => setSelectedDestId(dest.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 flex items-center space-x-1 ${
                  isSelected
                    ? 'bg-accent-terracotta text-white shadow-xs'
                    : 'bg-white text-teal-dark border border-divider hover:bg-mint-pale'
                }`}
              >
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[130px]">{dest.name}</span>
              </button>
            );
          })}
        </div>

        {/* Real Leaflet Map */}
        <RealLeafletMap destinations={destinations} activeDestinationId={selectedDestId} className="h-[400px] w-full" />

        {/* Selected Landmark Info Deck */}
        {selectedDest && (
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-divider shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden">
            <div className="space-y-1 min-w-0 flex-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-accent">
                {selectedDest.category} • {selectedDest.locationLabel}
              </span>
              <h4 className="text-base font-bold text-teal-dark truncate">
                {selectedDest.name}
              </h4>
              <p className="text-xs text-charcoal/80 line-clamp-1">
                {selectedDest.description}
              </p>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selectedDest.latitude},${selectedDest.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-teal-dark hover:bg-teal-accent text-white font-bold text-xs transition-all shadow-xs shrink-0 self-start sm:self-auto"
              title={`Open ${selectedDest.name} in Google Maps`}
            >
              <MapPin className="w-3.5 h-3.5 text-accent-green" />
              <span>Open in Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-accent-green" />
            </a>
          </div>
        )}

      </div>

    </div>
  );
}

