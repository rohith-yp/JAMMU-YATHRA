import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, MapPin, ArrowRight, Compass, Navigation, Info, ExternalLink } from 'lucide-react';
import { ItineraryResult } from '@/lib/types';

interface ItineraryTimelineProps {
  itinerary: ItineraryResult;
  onReset: () => void;
}

export default function ItineraryTimeline({ itinerary, onReset }: ItineraryTimelineProps) {
  const { startingPoint, availableTime, interests, travelPreference, stops, totalEstimatedTimeFormatted } = itinerary;

  return (
    <div className="space-y-10">
      
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-teal-dark to-teal-accent rounded-3xl p-6 sm:p-8 text-white shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-accent-green mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Demonstration Jammu Itinerary</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Your Suggested Jammu Journey
            </h2>
            <p className="text-xs sm:text-sm text-mint-light/90 mt-1">
              Customized route based on your starting hub, duration, and selected interests.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-right self-start sm:self-auto">
            <span className="block text-xs text-mint-light/80 font-medium uppercase tracking-wider">Total Planned Duration</span>
            <span className="text-xl font-bold text-accent-green">{totalEstimatedTimeFormatted}</span>
          </div>
        </div>

        {/* Selected Parameters Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-teal-deep/60 p-3 rounded-xl border border-white/10">
            <span className="text-mint-light/70 font-semibold block uppercase tracking-wider text-[10px]">Starting Point</span>
            <span className="font-bold text-white flex items-center space-x-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-accent-green shrink-0" />
              <span className="truncate">{startingPoint}</span>
            </span>
          </div>

          <div className="bg-teal-deep/60 p-3 rounded-xl border border-white/10">
            <span className="text-mint-light/70 font-semibold block uppercase tracking-wider text-[10px]">Time Budget</span>
            <span className="font-bold text-white flex items-center space-x-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-accent-green shrink-0" />
              <span>{availableTime}</span>
            </span>
          </div>

          <div className="bg-teal-deep/60 p-3 rounded-xl border border-white/10">
            <span className="text-mint-light/70 font-semibold block uppercase tracking-wider text-[10px]">Travel Style</span>
            <span className="font-bold text-white flex items-center space-x-1 mt-0.5">
              <Compass className="w-3.5 h-3.5 text-accent-green shrink-0" />
              <span>{travelPreference}</span>
            </span>
          </div>

          <div className="bg-teal-deep/60 p-3 rounded-xl border border-white/10">
            <span className="text-mint-light/70 font-semibold block uppercase tracking-wider text-[10px]">Interests Matched</span>
            <span className="font-bold text-white truncate block mt-0.5">
              {interests.length > 0 ? interests.slice(0, 2).join(', ') : 'All Experiences'}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline Stops */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-teal-dark flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-teal-accent" />
          <span>Recommended Sequence & Route Stops</span>
        </h3>

        <div className="relative border-l-2 border-teal-accent/30 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
          
          {stops.map((stop, index) => {
            const dest = stop.destination;
            return (
              <div key={dest.id} className="relative group">
                
                {/* Timeline Circle Marker */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-teal-dark border-4 border-white text-accent-green font-extrabold text-sm flex items-center justify-center shadow-md">
                  {stop.sequenceNumber}
                </div>

                {/* Stop Card */}
                <div className="bg-white rounded-2xl border border-divider shadow-subtle hover:shadow-card transition-all p-5 sm:p-6 space-y-4">
                  
                  {/* Travel Note Header */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-charcoal-muted bg-mint-pale px-3.5 py-2 rounded-xl border border-divider gap-2">
                    <span className="font-medium text-teal-dark">{stop.travelNote}</span>
                    <span className="text-[11px] font-semibold text-charcoal-light uppercase">{stop.orderReason}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Destination Image */}
                    <div className="md:col-span-4 relative h-48 rounded-xl overflow-hidden shadow-xs bg-teal-dark/10">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-teal-dark/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {dest.category}
                      </div>
                    </div>

                    {/* Destination Info */}
                    <div className="md:col-span-8 space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-bold text-teal-dark">
                            {dest.name}
                          </h4>
                          <span className="text-xs font-bold text-teal-accent bg-mint-pale px-2.5 py-1 rounded-full border border-teal-accent/30 flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Stay ~{stop.suggestedDurationMinutes} mins</span>
                          </span>
                        </div>
                        <p className="text-xs font-medium text-charcoal-light flex items-center space-x-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-accent-terracotta shrink-0" />
                          <span>{dest.locationLabel}</span>
                        </p>
                      </div>

                      <p className="text-sm text-charcoal/85 leading-relaxed">
                        {dest.description}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/destination/${dest.slug}`}
                          className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-dark hover:text-teal-accent bg-mint-pale px-3.5 py-2 rounded-lg border border-divider hover:border-teal-accent transition-colors"
                        >
                          <span>Explore Details</span>
                          <ArrowRight className="w-3.5 h-3.5 text-accent-terracotta" />
                        </Link>

                        {dest.isTawiExperience && (
                          <span className="text-[11px] font-semibold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                            Tawi Riverfront Attraction
                          </span>
                        )}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </div>

      {/* Illustrative Route Preview Notice */}
      <div className="bg-mint-pale p-5 rounded-2xl border border-divider flex items-start space-x-3 text-xs text-charcoal-muted">
        <Info className="w-5 h-5 text-teal-accent shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-teal-dark block">Illustrative Jammu Route Preview</span>
          <p className="leading-relaxed">
            Travel durations and transit order are estimated for demonstration purposes based on central Jammu city geometry. Local auto-rickshaws, taxis, and city mini-buses readily connect all suggested stops.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-divider">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-divider bg-white hover:bg-mint-pale text-teal-dark font-semibold text-sm transition-colors shadow-xs"
        >
          Create Another Itinerary
        </button>

        <Link
          href="/explore"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-dark hover:bg-teal-accent text-white font-semibold text-sm transition-colors shadow-md text-center"
        >
          Browse All Jammu Destinations
        </Link>
      </div>

    </div>
  );
}
