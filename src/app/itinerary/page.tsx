'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ItineraryTimeline from '@/components/ItineraryTimeline';
import MapPreview from '@/components/MapPreview';
import { ItineraryResult } from '@/lib/types';
import { generateJourneyItinerary } from '@/lib/itinerary';
import { Sparkles, ArrowLeft, RefreshCw, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ItineraryPage() {
  const router = useRouter();
  const [itinerary, setItinerary] = useState<ItineraryResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jammu_latest_itinerary');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setItinerary(parsed);
          setLoading(false);
          return;
        } catch (e) {
          console.error('Failed to parse itinerary', e);
        }
      }

      // Generate a default fallback itinerary if direct page visit
      const defaultResult = generateJourneyItinerary({
        startingPoint: 'Jammu Tawi Railway Station',
        availableTime: 'Half-day',
        interests: ['Heritage and history', 'Riverfront experiences'],
        travelPreference: 'Relaxed exploration'
      });
      setItinerary(defaultResult);
      setLoading(false);
    }
  }, []);

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jammu_latest_itinerary');
    }
    router.push('/plan');
  };

  if (loading || !itinerary) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-teal-accent border-t-transparent animate-spin mx-auto"></div>
        <p className="text-sm font-semibold text-teal-dark">Loading your Jammu itinerary...</p>
      </div>
    );
  }

  const mapDestinations = itinerary.stops.map((s) => s.destination);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/plan"
          className="inline-flex items-center space-x-2 text-xs font-bold text-teal-dark hover:text-teal-accent bg-white px-4 py-2 rounded-xl border border-divider shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-accent-terracotta" />
          <span>Edit Preferences</span>
        </Link>

        <button
          onClick={handleReset}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-charcoal-muted hover:text-teal-dark transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Start Fresh</span>
        </button>
      </div>

      {/* Main Itinerary Timeline Component */}
      <ItineraryTimeline itinerary={itinerary} onReset={handleReset} />

      {/* Route Map Preview */}
      <div className="space-y-4 pt-4 border-t border-divider">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-teal-accent" />
          <h3 className="text-xl font-bold text-teal-dark">Itinerary Destination Route Map</h3>
        </div>
        <MapPreview destinations={mapDestinations} />
      </div>

    </div>
  );
}
