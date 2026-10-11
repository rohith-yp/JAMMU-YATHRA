import { JAMMU_DESTINATIONS } from './destinations';
import { Destination, ItineraryResult, ItineraryStop, JourneyFormState } from './types';

export function generateJourneyItinerary(form: JourneyFormState): ItineraryResult {
  const { startingPoint, availableTime, interests, travelPreference } = form;

  // Calculate target total visit minutes based on time budget
  let maxMinutesBudget = 150; // 3 hours default
  if (availableTime === 'Half-day') {
    maxMinutesBudget = 270; // 4.5 hours
  } else if (availableTime === 'Full-day') {
    maxMinutesBudget = 420; // 7 hours
  }

  // Adjust max stops based on travel preference
  let targetStopsCount = 2;
  if (availableTime === '3 hours') {
    targetStopsCount = travelPreference === 'Visit more places' ? 3 : 2;
  } else if (availableTime === 'Half-day') {
    targetStopsCount = travelPreference === 'Visit more places' ? 4 : 3;
  } else if (availableTime === 'Full-day') {
    targetStopsCount = travelPreference === 'Visit more places' ? 6 : 4;
  }

  // Score each destination based on user selections
  const scoredDestinations = JAMMU_DESTINATIONS.map((dest) => {
    let score = 0;

    // 1. Interest matches
    if (interests && interests.length > 0) {
      const matchCount = dest.interests.filter((i) => interests.includes(i)).length;
      score += matchCount * 15;
    } else {
      score += 10;
    }

    // 2. Travel Preference Alignment
    if (travelPreference === 'Cultural focus') {
      if (dest.category === 'Heritage' || dest.category === 'Culture' || dest.category === 'Pilgrimage') {
        score += 12;
      }
    } else if (travelPreference === 'Scenic & Photography') {
      if (dest.category === 'Nature' || dest.category === 'Riverfront' || dest.isTawiExperience) {
        score += 12;
      }
    } else if (travelPreference === 'Relaxed exploration') {
      if (dest.estimatedVisitMinutes <= 60) {
        score += 8;
      }
    }

    // 3. Starting point proximity bonus (simulated based on location text)
    if (startingPoint) {
      const lowerStart = startingPoint.toLowerCase();
      const lowerLoc = dest.locationLabel.toLowerCase();
      if (
        (lowerStart.includes('bahu') && lowerLoc.includes('bahu')) ||
        (lowerStart.includes('old city') && lowerLoc.includes('old city')) ||
        (lowerStart.includes('raghunath') && lowerLoc.includes('raghunath')) ||
        (lowerStart.includes('tawi') && (dest.isTawiExperience || lowerLoc.includes('tawi')))
      ) {
        score += 20;
      }
    }

    // 4. Featured & Verified Boost
    if (dest.featured) score += 5;
    if (dest.isVerified) score += 3;

    return { destination: dest, score };
  });

  // Sort by score descending
  scoredDestinations.sort((a, b) => b.score - a.score);

  // Select destinations within time budget
  const selectedDestinations: Destination[] = [];
  let accumulatedMinutes = 0;

  for (const item of scoredDestinations) {
    if (selectedDestinations.length >= targetStopsCount) break;

    // Check if adding this destination exceeds budget significantly
    if (accumulatedMinutes + item.destination.estimatedVisitMinutes <= maxMinutesBudget + 30) {
      selectedDestinations.push(item.destination);
      accumulatedMinutes += item.destination.estimatedVisitMinutes;
    }
  }

  // Fallback if none matched perfectly
  if (selectedDestinations.length === 0) {
    selectedDestinations.push(JAMMU_DESTINATIONS[0], JAMMU_DESTINATIONS[1]);
    accumulatedMinutes = JAMMU_DESTINATIONS[0].estimatedVisitMinutes + JAMMU_DESTINATIONS[1].estimatedVisitMinutes;
  }

  // Order logically: Heritage/Pilgrimage morning -> Riverfront/Markets afternoon/sunset
  selectedDestinations.sort((a, b) => {
    const orderScore = (d: Destination) => {
      if (d.category === 'Pilgrimage') return 1;
      if (d.category === 'Heritage') return 2;
      if (d.category === 'Nature') return 3;
      if (d.isTawiExperience) return 4;
      if (d.category === 'Culture' || d.category === 'Local Experiences') return 5;
      return 6;
    };
    return orderScore(a) - orderScore(b);
  });

  // Build timeline stops
  const stops: ItineraryStop[] = selectedDestinations.map((dest, index) => {
    let travelNote = '';
    let orderReason = '';

    if (index === 0) {
      travelNote = `Start your tour from ${startingPoint || 'Jammu City Centre'}. ~10-15 mins travel time.`;
      orderReason = `Ideal first stop for morning darshan or historic overview.`;
    } else {
      const prev = selectedDestinations[index - 1];
      travelNote = `~15-20 mins short drive/auto-rickshaw ride from ${prev.name}.`;
      orderReason = `Convenient next stop nearby along your Jammu route.`;
    }

    return {
      destination: dest,
      suggestedDurationMinutes: dest.estimatedVisitMinutes,
      sequenceNumber: index + 1,
      travelNote,
      orderReason
    };
  });

  const hours = Math.floor(accumulatedMinutes / 60);
  const mins = accumulatedMinutes % 60;
  const timeFormatted = hours > 0 ? `${hours} hr ${mins > 0 ? `${mins} mins` : ''}` : `${mins} mins`;

  return {
    id: `jmy-${Date.now()}`,
    createdAt: new Date().toISOString(),
    startingPoint: startingPoint || 'Jammu City Centre',
    availableTime,
    interests: interests || [],
    travelPreference,
    stops,
    totalVisitMinutes: accumulatedMinutes,
    totalEstimatedTimeFormatted: timeFormatted
  };
}
