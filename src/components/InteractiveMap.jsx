import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icons not showing in React correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// A component to automatically zoom to the pins
function MapBounds({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 12, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
}

export default function InteractiveMap({ locationName }) {
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default India

  useEffect(() => {
    // Geocode the location name using OpenStreetMap Nominatim
    if (!locationName) return;
    
    // Only fetch if it's an actual specific city to avoid generic "India" centering too far out
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      })
      .catch(err => console.error("Geocoding error", err));
  }, [locationName]);

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg border border-white/10 relative z-0">
      <MapContainer center={position} zoom={5} scrollWheelZoom={true} className="w-full h-full" style={{ background: '#0A0A0A', zIndex: 1 }}>
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="font-bold text-black">{locationName || "India"}</div>
          </Popup>
        </Marker>
        <MapBounds position={position} />
      </MapContainer>
    </div>
  );
}
