"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { NearbyListing } from "@/app/search/nearby/actions";

// Fix default icon in Next.js
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function houseIcon(selected: boolean) {
  return L.divIcon({
    html: `<div class="flex h-9 w-9 items-center justify-center rounded-full shadow-md text-lg" style="background:${selected ? "#44403c" : "#1c1917"};color:white">🏠</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    className: "border-0 bg-transparent",
  });
}

function FitBounds({ listings }: { listings: NearbyListing[] }) {
  const map = useMap();
  useEffect(() => {
    if (listings.length > 0) {
      const bounds = L.latLngBounds(listings.map((l) => [l.lat, l.lng]));
      map.fitBounds(bounds.pad(0.15));
    }
  }, [listings, map]);
  return null;
}

interface MapInnerProps {
  listings: NearbyListing[];
  centre: { lat: number; lng: number };
  selectedId: string | null;
  onMarkerClick: (id: string) => void;
}

export default function MapInner({ listings, centre, selectedId, onMarkerClick }: MapInnerProps) {
  return (
    <div className="h-[320px] w-full overflow-hidden rounded-xl border border-stone-200 sm:h-[400px]">
      <MapContainer
        center={[centre.lat, centre.lng]}
        zoom={14}
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds listings={listings} />
        {listings.map((l) => (
          <Marker
            key={l.id}
            position={[l.lat, l.lng]}
            icon={houseIcon(l.id === selectedId)}
            eventHandlers={{ click: () => onMarkerClick(l.id) }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div className="aspect-video overflow-hidden rounded-lg bg-stone-100">
                  {l.mainImageUrl ? (
                    <img
                      src={l.mainImageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-stone-400">No image</div>
                  )}
                </div>
                <p className="mt-2 font-semibold text-stone-900">{l.title}</p>
                <p className="text-sm text-stone-600">{l.displayPrice}</p>
                {l.bedrooms != null && (
                  <p className="text-xs text-stone-500">{l.bedrooms} bed</p>
                )}
                <p className="mt-1 text-xs text-stone-500">
                  {l.distanceKm < 1
                    ? `${Math.round(l.distanceKm * 1000)} m away`
                    : `${l.distanceKm.toFixed(1)} km away`}
                </p>
                <a
                  href={`/property/${l.id}?intent=${l.priceType === "pcm" ? "rent" : "buy"}`}
                  className="mt-2 block rounded-lg bg-stone-900 px-3 py-2 text-center text-sm font-medium text-white hover:bg-stone-800"
                >
                  View details
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
