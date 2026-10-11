export type DestinationCategory =
  | 'Heritage'
  | 'Nature'
  | 'Pilgrimage'
  | 'Culture'
  | 'Local Experiences'
  | 'Riverfront';

export type InterestOption =
  | 'Heritage and history'
  | 'Nature and scenic views'
  | 'Culture and traditions'
  | 'Local markets'
  | 'Pilgrimage-related attractions'
  | 'Riverfront experiences';

export type TimeDuration = '3 hours' | 'Half-day' | 'Full-day';

export type TravelPreference = 'Relaxed exploration' | 'Visit more places' | 'Cultural focus' | 'Scenic & Photography';

export interface Destination {
  id: string;
  slug: string;
  name: string;
  category: DestinationCategory;
  description: string;
  detailedOverview: string;
  significance: string;
  image: string;
  gallery?: string[];
  interests: InterestOption[];
  locationLabel: string;
  latitude: number;
  longitude: number;
  estimatedVisitMinutes: number;
  featured: boolean;
  isVerified: boolean;
  isTawiExperience: boolean;
  isHiddenJammu: boolean;
  bestTimeToVisit?: string;
  entryFee?: string;
  practicalInfo?: string;
  nearbyAttractions?: string[];
}

export interface JourneyFormState {
  startingPoint: string;
  availableTime: TimeDuration;
  interests: InterestOption[];
  travelPreference: TravelPreference;
}

export interface ItineraryStop {
  destination: Destination;
  suggestedDurationMinutes: number;
  sequenceNumber: number;
  travelNote: string;
  orderReason: string;
}

export interface ItineraryResult {
  id: string;
  createdAt: string;
  startingPoint: string;
  availableTime: TimeDuration;
  interests: InterestOption[];
  travelPreference: TravelPreference;
  stops: ItineraryStop[];
  totalVisitMinutes: number;
  totalEstimatedTimeFormatted: string;
}
