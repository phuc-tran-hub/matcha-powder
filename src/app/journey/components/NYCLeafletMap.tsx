'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

// Define the shop type
export interface MatchaShop {
  name: string;
  location: [number, number]; // [longitude, latitude]
  rating: number;
}

export interface NYCLeafletMapProps {
  matchaShops: MatchaShop[];
}

export default function NYCLeafletMap({ matchaShops }: NYCLeafletMapProps) {
  // Set default position to NYC
  const [position] = useState<[number, number]>([40.73, -73.98]); // [latitude, longitude]
  
  // Fix for Leaflet marker icons
  useEffect(() => {
    // Fix Leaflet's default icon
    const DefaultIcon = L.icon({
      iconUrl: '/images/marker-icon.png',
      iconRetinaUrl: '/images/marker-icon-2x.png',
      shadowUrl: '/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer 
        center={position} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {matchaShops.map((shop, index) => {
          // Convert longitude, latitude to latitude, longitude for Leaflet
          const markerPosition: [number, number] = [shop.location[1], shop.location[0]];
          
          // Scale the circle radius based on the rating (higher rating = larger circle)
          const radius = shop.rating * 100;
          
          return (
            <div key={index}>
              <Marker position={markerPosition}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold text-green-800">{shop.name}</h3>
                    <p className="text-sm">Rating: {shop.rating}/5</p>
                  </div>
                </Popup>
              </Marker>
              <Circle 
                center={markerPosition}
                radius={radius}
                pathOptions={{ 
                  fillColor: '#4ade80', 
                  fillOpacity: 0.4,
                  color: '#166534',
                  weight: 1
                }}
              />
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}
