'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Destination } from '@/lib/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Plus, Minus, Maximize2, Minimize2, Compass, X } from 'lucide-react';

interface RealLeafletMapProps {
  destinations: Destination[];
  activeDestinationId?: string;
  className?: string;
}

export default function RealLeafletMap({
  destinations,
  activeDestinationId,
  className = 'h-[450px] w-full',
}: RealLeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Official Free OpenStreetMap Tile Layer
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const defaultCenter: [number, number] = [32.726, 74.865];

    // Enable all map zooming options: scroll wheel, pinch touch, double click
    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 12,
      minZoom: 4,
      maxZoom: 19,
      scrollWheelZoom: true,
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      zoomControl: false, // Custom styled controls provided below
    });

    mapRef.current = map;

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const bounds: L.LatLngBounds = L.latLngBounds([]);
    markersRef.current = {};

    destinations.forEach((dest) => {
      if (dest.latitude && dest.longitude) {
        const latLng: [number, number] = [dest.latitude, dest.longitude];
        bounds.extend(latLng);

        const isActive = dest.id === activeDestinationId;

        const pinHtml = `
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${isActive ? 'linear-gradient(135deg, #9B4C2F, #C85A32)' : 'linear-gradient(135deg, #164F50, #237C70)'};
            color: #ffffff;
            border: 2.5px solid #ffffff;
            border-radius: 9999px;
            padding: 5px 12px;
            box-shadow: 0 6px 14px rgba(0,0,0,0.45);
            font-size: 11px;
            font-weight: 800;
            white-space: nowrap;
            cursor: pointer;
            letter-spacing: 0.2px;
            transform: scale(${isActive ? '1.1' : '1'});
          ">
            <span style="margin-right: 5px;">📍</span>
            <span>${dest.name}</span>
          </div>
        `;

        const customIcon = L.divIcon({
          html: pinHtml,
          className: 'custom-leaflet-3d-pin',
          iconSize: [140, 36],
          iconAnchor: [70, 18],
          popupAnchor: [0, -22],
        });

        const popupHtml = `
          <div style="font-family: inherit; width: 100%; box-sizing: border-box; padding: 2px 1px;">
            <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #164F50; margin-bottom: 3px;">
              ${dest.category} • ${dest.locationLabel}
            </div>
            <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 800; color: #0f172a; line-height: 1.3;">
              ${dest.name}
            </h4>
            <p style="margin: 0 0 10px 0; font-size: 11px; color: #475569; line-height: 1.45;">
              ${dest.description.substring(0, 80)}...
            </p>
            <a href="/destination/${dest.slug}" style="
              display: block;
              text-align: center;
              background-color: #164F50;
              color: #ffffff;
              padding: 7px 12px;
              border-radius: 8px;
              font-size: 11px;
              font-weight: 700;
              text-decoration: none;
              box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            ">Explore Landmark Guide &rarr;</a>
          </div>
        `;

        const marker = L.marker(latLng, { icon: customIcon }).addTo(map);
        marker.bindPopup(popupHtml, {
          autoPan: true,
          autoPanPadding: [24, 24],
          closeButton: true,
          maxWidth: 250,
          minWidth: 200,
        });

        if (isActive) {
          marker.openPopup();
        }

        markersRef.current[dest.id] = marker;
      }
    });

    if (destinations.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    }

    // Intercept wheel events with Ctrl/Meta to prevent whole browser screen zooming
    const container = mapContainerRef.current;
    const handleWheelCapture = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        if (mapRef.current) {
          if (e.deltaY < 0) {
            mapRef.current.zoomIn();
          } else {
            mapRef.current.zoomOut();
          }
        }
      }
    };

    container.addEventListener('wheel', handleWheelCapture, { passive: false });

    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 250);

    return () => {
      container.removeEventListener('wheel', handleWheelCapture);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [destinations, activeDestinationId, isFullscreen]);

  // Dedicated Zoom Controls Handlers
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const mapContent = (
    <div
      className={`relative rounded-2xl overflow-hidden border-2 border-white shadow-elevated bg-slate-900 ${
        isFullscreen ? 'w-full h-full' : className
      }`}
    >
      {/* Top Right: Compact Fullscreen Button */}
      <div className="absolute top-3 right-3 z-[400]">
        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 px-3 rounded-xl bg-white/95 hover:bg-mint-pale text-teal-dark font-bold text-xs shadow-md border border-divider transition-all flex items-center space-x-1.5 backdrop-blur-md"
          title={isFullscreen ? 'Exit Full Screen' : 'Full Screen Map'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          <span className="hidden sm:inline">{isFullscreen ? 'Exit Full' : 'Full Screen'}</span>
        </button>
      </div>

      {/* Bottom Right: Clean Vertical Zoom In / Out Controls */}
      <div className="absolute bottom-3 right-3 z-[400] flex flex-col rounded-xl overflow-hidden shadow-md border border-divider bg-white/95 backdrop-blur-md divide-y divide-divider">
        <button
          type="button"
          onClick={handleZoomIn}
          className="w-8 h-8 flex items-center justify-center hover:bg-mint-pale text-teal-dark font-bold transition-colors"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="w-8 h-8 flex items-center justify-center hover:bg-mint-pale text-teal-dark font-bold transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Leaflet Map */}
      <div className="w-full h-full overflow-hidden">
        <div ref={mapContainerRef} className="w-full h-full z-10" />
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-lg p-4 sm:p-6 flex flex-col space-y-3">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-accent-green" />
            <h3 className="font-extrabold text-lg text-white">Jammu Interactive OpenStreetMap</h3>
          </div>
          <button
            onClick={() => setIsFullscreen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 w-full relative">{mapContent}</div>
      </div>
    );
  }

  return mapContent;
}




