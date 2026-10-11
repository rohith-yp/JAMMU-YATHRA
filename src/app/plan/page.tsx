import React from 'react';
import JourneyForm from '@/components/JourneyForm';
import { Clock, Compass, ShieldCheck } from 'lucide-react';

export default function PlanPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-teal-dark tracking-tight">
          Plan Your Jammu Journey
        </h1>

        <p className="text-base text-charcoal-muted leading-relaxed">
          Tell us where you are starting, how much time you have, and what you love. We’ll generate a tailored, time-optimized Jammu itinerary for you.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Main Form */}
        <div className="lg:col-span-8">
          <JourneyForm />
        </div>

        {/* Sidebar Tips */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-divider shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-teal-dark flex items-center space-x-2">
              <Compass className="w-5 h-5 text-teal-accent" />
              <span>How It Works</span>
            </h3>

            <ul className="space-y-3 text-xs text-charcoal/85 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-mint-pale text-teal-dark font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Select your starting location in Jammu (Railway station, Airport, Old City, or Katra).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-mint-pale text-teal-dark font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Choose your available duration (3 hours, Half-day, or Full-day).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-mint-pale text-teal-dark font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>Pick your interests like Heritage, Nature, Markets, or Riverfront.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-mint-pale text-teal-dark font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">4</span>
                <span>Our smart algorithm generates a structured route sequence with estimated durations.</span>
              </li>
            </ul>
          </div>

          <div className="bg-teal-dark text-white rounded-3xl p-6 shadow-subtle space-y-3">
            <div className="flex items-center space-x-2 text-accent-green font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Route Planner</span>
            </div>
            <h4 className="text-sm font-bold text-white">Custom Jammu Travel Logic</h4>
            <p className="text-xs text-mint-light/80 leading-relaxed">
              Routes are calculated using official distance, transit times, and heritage site opening hours across Jammu & Kashmir.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
