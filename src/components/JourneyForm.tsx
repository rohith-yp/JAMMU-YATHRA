'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Clock,
  Heart,
  Compass,
  Check,
  AlertCircle,
  Loader2,
  Navigation,
  Crosshair,
  Landmark,
  Trees,
  Palette,
  ShoppingBag,
  Flame,
  Waves
} from 'lucide-react';
import { InterestOption, TimeDuration, TravelPreference, JourneyFormState } from '@/lib/types';
import { generateJourneyItinerary } from '@/lib/itinerary';

const PRESET_STARTING_POINTS = [
  'Jammu Tawi Railway Station',
  'Jammu Civil Airport (IXJ)',
  'Raghunath Temple & Old City Hub',
  'Bahu Fort & Promenade Area',
  'Katra (Vaishno Devi Base Camp)',
  'Jammu Bus Stand (ISBT)'
];

const INTEREST_OPTIONS: {
  label: InterestOption;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
}[] = [
  { label: 'Heritage and history', icon: Landmark, desc: 'Forts, palaces & Dogra architecture' },
  { label: 'Nature and scenic views', icon: Trees, desc: 'Lakes, pine ridges & gardens' },
  { label: 'Culture and traditions', icon: Palette, desc: 'Art galleries, crafts & folk shrines' },
  { label: 'Local markets', icon: ShoppingBag, desc: 'Saffron, dry fruits & Kaladi cheese' },
  { label: 'Pilgrimage-related attractions', icon: Flame, desc: 'Historic temples & cave shrines' },
  { label: 'Riverfront experiences', icon: Waves, desc: 'Tawi promenade & river ghats' }
];

const DURATION_OPTIONS: { label: TimeDuration; tag: string; desc: string }[] = [
  { label: '3 hours', tag: 'Quick Circuit', desc: '2-3 key stops near your hub' },
  { label: 'Half-day', tag: 'Half-Day Tour', desc: '3-4 balanced heritage & riverfront stops' },
  { label: 'Full-day', tag: 'Complete Discovery', desc: '5-6 comprehensive spots across Jammu' }
];

const PREFERENCE_OPTIONS: { label: TravelPreference; desc: string }[] = [
  { label: 'Relaxed exploration', desc: 'Unhurried pace with ample time at each site' },
  { label: 'Visit more places', desc: 'Pack more landmarks into your schedule' },
  { label: 'Cultural focus', desc: 'Prioritize museums, history & local heritage' },
  { label: 'Scenic & Photography', desc: 'Prioritize landscape lookouts & riverfronts' }
];

export default function JourneyForm() {
  const router = useRouter();

  const [startingPoint, setStartingPoint] = useState<string>('Jammu Tawi Railway Station');
  const [customStartingPoint, setCustomStartingPoint] = useState<string>('');
  const [availableTime, setAvailableTime] = useState<TimeDuration>('Half-day');
  const [selectedInterests, setSelectedInterests] = useState<InterestOption[]>([
    'Heritage and history',
    'Riverfront experiences'
  ]);
  const [travelPreference, setTravelPreference] = useState<TravelPreference>('Relaxed exploration');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationDetected, setLocationDetected] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleUseCurrentLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setErrorMsg('Geolocation service is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setErrorMsg('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);
        
        // Proximity check for Jammu region (approx lat 32.726, lng 74.857)
        const jammuLat = 32.726;
        const jammuLng = 74.857;
        const dist = Math.sqrt(
          Math.pow(parseFloat(lat) - jammuLat, 2) + Math.pow(parseFloat(lng) - jammuLng, 2)
        );

        let locationLabel = `GPS Location (${lat}° N, ${lng}° E)`;
        if (dist < 0.35) {
          locationLabel = `Current Location (${lat}° N, ${lng}° E - Jammu Area)`;
        }

        setCustomStartingPoint(locationLabel);
        setStartingPoint('Current Location');
        setLocationDetected(locationLabel);
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMsg('Location permission denied. Please select from presets below or type your starting point.');
        } else {
          setErrorMsg('Unable to retrieve current location. Please select or type your starting point.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const toggleInterest = (interest: InterestOption) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length === 1) {
        setErrorMsg('Please keep at least one interest selected.');
        return;
      }
      setErrorMsg('');
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setErrorMsg('');
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalStart = customStartingPoint.trim() || startingPoint;

    if (!finalStart) {
      setErrorMsg('Please select or specify a starting point.');
      return;
    }
    if (selectedInterests.length === 0) {
      setErrorMsg('Please select at least one travel interest.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    const formState: JourneyFormState = {
      startingPoint: finalStart,
      availableTime,
      interests: selectedInterests,
      travelPreference
    };

    setTimeout(() => {
      const result = generateJourneyItinerary(formState);
      if (typeof window !== 'undefined') {
        localStorage.setItem('jammu_latest_itinerary', JSON.stringify(result));
      }
      setIsLoading(false);
      router.push('/itinerary');
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-divider shadow-card p-6 sm:p-10 space-y-10">
      
      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: Starting Point */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-full bg-teal-dark text-white text-xs font-bold flex items-center justify-center">1</span>
            <h3 className="text-lg font-bold text-teal-dark">Where are you starting your journey from?</h3>
          </div>

          {/* GPS Location Button */}
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="inline-flex items-center space-x-2 text-xs font-bold px-3.5 py-2 rounded-xl bg-teal-dark/5 text-teal-dark hover:bg-teal-dark hover:text-white border border-teal-dark/20 transition-all shrink-0 self-start sm:self-auto"
          >
            {isLocating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-teal-accent" />
                <span>Detecting GPS Location...</span>
              </>
            ) : (
              <>
                <Crosshair className="w-4 h-4 text-teal-accent" />
                <span>Use My Current Location (GPS)</span>
              </>
            )}
          </button>
        </div>

        {locationDetected && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2 rounded-xl text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">Active Location: {locationDetected}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setLocationDetected(null);
                setCustomStartingPoint('');
                setStartingPoint('Jammu Tawi Railway Station');
              }}
              className="text-emerald-700 underline font-medium hover:text-emerald-900 ml-2"
            >
              Reset
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {PRESET_STARTING_POINTS.map((pt) => {
            const isSelected = (startingPoint === pt || (!startingPoint && !customStartingPoint && pt === PRESET_STARTING_POINTS[0])) && !customStartingPoint;
            return (
              <button
                type="button"
                key={pt}
                onClick={() => {
                  setStartingPoint(pt);
                  setCustomStartingPoint('');
                  setLocationDetected(null);
                }}
                className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-teal-accent bg-mint-pale text-teal-dark ring-2 ring-teal-accent/30 shadow-xs'
                    : 'border-divider hover:border-teal-accent/50 text-charcoal bg-white'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? 'text-teal-accent' : 'text-charcoal-light'}`} />
                  <span className="truncate">{pt}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-teal-dark shrink-0" />}
              </button>
            );
          })}
        </div>

        <div className="pt-1">
          <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1.5">
            Or type a custom Jammu starting location:
          </label>
          <input
            type="text"
            placeholder="e.g. Hotel Asia Jammu, Gandhi Nagar, Sidhra..."
            value={customStartingPoint}
            onChange={(e) => {
              setCustomStartingPoint(e.target.value);
              if (locationDetected && e.target.value !== locationDetected) {
                setLocationDetected(null);
              }
            }}
            className="w-full px-4 py-3 rounded-xl border border-divider focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/20 text-sm text-charcoal outline-none transition-all"
          />
        </div>
      </div>

      {/* STEP 2: Available Time */}
      <div className="space-y-4 pt-6 border-t border-divider">
        <div className="flex items-center space-x-2">
          <span className="w-7 h-7 rounded-full bg-teal-dark text-white text-xs font-bold flex items-center justify-center">2</span>
          <h3 className="text-lg font-bold text-teal-dark">How much time do you have available?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DURATION_OPTIONS.map((dur) => {
            const isSelected = availableTime === dur.label;
            return (
              <button
                type="button"
                key={dur.label}
                onClick={() => setAvailableTime(dur.label)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-teal-accent bg-mint-pale text-teal-dark ring-2 ring-teal-accent/30 shadow-sm'
                    : 'border-divider hover:border-teal-accent/50 text-charcoal bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-bold text-teal-dark flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-teal-accent" />
                    <span>{dur.label}</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-dark/10 text-teal-dark">
                    {dur.tag}
                  </span>
                </div>
                <p className="text-xs text-charcoal-muted">{dur.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3: Interests */}
      <div className="space-y-4 pt-6 border-t border-divider">
        <div className="flex items-center space-x-2">
          <span className="w-7 h-7 rounded-full bg-teal-dark text-white text-xs font-bold flex items-center justify-center">3</span>
          <h3 className="text-lg font-bold text-teal-dark">Select your travel interests (Multiple allowed):</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {INTEREST_OPTIONS.map((item) => {
            const isSelected = selectedInterests.includes(item.label);
            return (
              <button
                type="button"
                key={item.label}
                onClick={() => toggleInterest(item.label)}
                className={`p-4 rounded-xl border text-left transition-all flex items-start space-x-3 ${
                  isSelected
                    ? 'border-teal-accent bg-mint-pale text-teal-dark ring-2 ring-teal-accent/30 shadow-xs'
                    : 'border-divider hover:border-teal-accent/50 text-charcoal bg-white'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-teal-accent text-white shadow-xs'
                      : 'bg-mint-pale text-teal-dark'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-dark">{item.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-teal-accent shrink-0" />}
                  </div>
                  <p className="text-[11px] text-charcoal-muted leading-tight">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 4: Travel Preference */}
      <div className="space-y-4 pt-6 border-t border-divider">
        <div className="flex items-center space-x-2">
          <span className="w-7 h-7 rounded-full bg-teal-dark text-white text-xs font-bold flex items-center justify-center">4</span>
          <h3 className="text-lg font-bold text-teal-dark">Select your travel style preference:</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PREFERENCE_OPTIONS.map((pref) => {
            const isSelected = travelPreference === pref.label;
            return (
              <button
                type="button"
                key={pref.label}
                onClick={() => setTravelPreference(pref.label)}
                className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-teal-accent bg-mint-pale text-teal-dark ring-2 ring-teal-accent/30 shadow-xs'
                    : 'border-divider hover:border-teal-accent/50 text-charcoal bg-white'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold text-teal-dark">{pref.label}</h4>
                  <p className="text-xs text-charcoal-muted mt-0.5">{pref.desc}</p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-teal-accent shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-6 border-t border-divider">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-8 rounded-2xl bg-teal-dark hover:bg-teal-accent text-white font-bold text-lg shadow-card hover:shadow-elevated transition-all flex items-center justify-center space-x-3 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin text-accent-green" />
              <span>Generating Custom Jammu Itinerary...</span>
            </>
          ) : (
            <>
              <Compass className="w-6 h-6 text-accent-green" />
              <span>Generate My Journey</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
}
