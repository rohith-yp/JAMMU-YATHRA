import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DestinationCard from '@/components/DestinationCard';
import MapPreview from '@/components/MapPreview';
import { JAMMU_DESTINATIONS } from '@/lib/destinations';
import { Waves, MapPin, Compass, ArrowRight, ShieldCheck, Sun } from 'lucide-react';

export default function TawiExperiencePage() {
  const tawiDestinations = JAMMU_DESTINATIONS.filter((d) => d.isTawiExperience);

  return (
    <div className="py-10 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero Riverfront Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-elevated bg-teal-dark text-white border-4 border-white">
        <div className="relative h-[420px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80"
            alt="Tawi River Corridor, Jammu"
            fill
            priority
            unoptimized
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-dark via-teal-dark/50 to-transparent" />
        </div>

        <div className="absolute inset-0 p-8 sm:p-14 flex flex-col justify-end space-y-4 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Experience the Tawi
          </h1>

          <p className="text-base sm:text-lg text-mint-light/90 leading-relaxed">
            The Tawi River flows gracefully through Jammu, giving life to ancient fortresses, riverside shrines, eco-promenades, and sunset viewpoints that define the city's historic identity.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/plan?interest=Riverfront+experiences"
              className="px-6 py-3 rounded-xl bg-accent-green hover:bg-emerald-400 text-teal-dark font-bold text-sm shadow-md transition-all flex items-center space-x-2"
            >
              <Compass className="w-4 h-4" />
              <span>Plan Tawi Riverfront Journey</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl p-6 border border-divider shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-900 text-cyan-300 flex items-center justify-center">
            <Waves className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-teal-dark">Promenade & Walkways</h3>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Landscaped pedestrian pathways, eco-parks, and sunset decks along the Tawi riverbank offering fresh morning breezes and calm evening walks.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-divider shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-dark text-accent-green flex items-center justify-center">
            <Sun className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-teal-dark">Riverside Cave Shrines</h3>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Historic cave shrines like Peer Kho and Bawe Wali Mata perched high above sandstone cliffs overlooking the flowing river waters.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-divider shadow-subtle space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-900 text-amber-300 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-teal-dark">Royal River Overlooks</h3>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Panoramic royal palaces including Mubarak Mandi and Hari Niwas Palace built on ridges to command grand views of the Tawi Valley.
          </p>
        </div>

      </div>

      {/* Destinations along Tawi River */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-divider pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-dark">
              Tawi Riverfront Circuit Destinations
            </h2>
          </div>
          <span className="text-xs font-semibold text-charcoal-muted">
            {tawiDestinations.length} Tawi River Locations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tawiDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>

      {/* Map Preview */}
      <div className="space-y-4 pt-4 border-t border-divider">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-teal-accent" />
          <h3 className="text-xl font-bold text-teal-dark">Tawi Riverfront Locations Map</h3>
        </div>
        <MapPreview destinations={tawiDestinations} />
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-teal-dark to-teal-accent text-white p-8 sm:p-10 rounded-3xl text-center space-y-4 shadow-card">
        <h3 className="text-2xl sm:text-3xl font-bold">Ready to Experience the Tawi Riverfront?</h3>
        <p className="text-sm text-mint-light/90 max-w-xl mx-auto">
          Incorporate Tawi riverwalks, cave shrines, and sunset lookouts into your custom Jammu itinerary.
        </p>
        <div className="pt-2">
          <Link
            href="/plan"
            className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-accent-green hover:bg-emerald-400 text-teal-dark font-extrabold text-sm transition-all shadow-md"
          >
            <Compass className="w-4 h-4" />
            <span>Generate Tawi Itinerary</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
