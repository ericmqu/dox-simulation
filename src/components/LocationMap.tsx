
import React, { useState, useEffect } from 'react';
import { Terminal } from '@/components/Terminal';
import { useTypewriter } from '@/utils/animations';

interface LocationMapProps {
  location: {
    latitude: number;
    longitude: number;
    city: string;
    region: string;
    country: string;
  };
  onComplete: () => void;
}

const LocationMap: React.FC<LocationMapProps> = ({ location, onComplete }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const headerText = useTypewriter('GEOLOCATION TRACKING RESULT', 40);
  
  useEffect(() => {
    // After the component mounts, wait a bit then show the map
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1500);
    
    // After showing the map for a while, proceed to the next component
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 8000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);
  
  // Generate Google Maps embed URL with the provided coordinates
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.latitude},${location.longitude}&zoom=14`;
  
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <Terminal title="GEOLOCATION TRACKER">
        <div className="py-2">
          <h2 className="text-terminal-error text-xl font-bold mb-6">
            {headerText.displayText}
            {!headerText.isComplete && <span className="terminal-cursor"></span>}
          </h2>
          
          <div className="mb-6 animate-fade-in">
            <div className="flex flex-col gap-2 mb-4">
              <p className="text-terminal-highlight">
                Target Location: <span className="text-terminal-error">{location.city}, {location.region}, {location.country}</span>
              </p>
              <p className="text-terminal-highlight">
                Coordinates: <span className="text-terminal-error">{location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</span>
              </p>
              <p className="text-terminal-warning">
                Accuracy: Within 1 kilometer radius
              </p>
            </div>
            
            <div className="relative overflow-hidden rounded-md border border-terminal-accent/50 animate-pulse-warning">
              {isMapLoaded ? (
                <iframe
                  className="w-full h-72 pointer-events-none"
                  loading="lazy"
                  src={mapUrl}
                  title="Location Map"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-72 bg-terminal-accent/10 flex items-center justify-center">
                  <p className="text-terminal-accent animate-pulse">Loading map data...</p>
                </div>
              )}
              
              {/* Overlay effect */}
              <div className="absolute inset-0 pointer-events-none bg-terminal-accent/10 mix-blend-overlay"></div>
              
              {/* Target marker overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-terminal-error">
                <div className="w-16 h-16 rounded-full border-2 border-terminal-error animate-pulse-error flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-terminal-error"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '2s' }}>
            <p className="text-terminal-error">Triangulating exact position...</p>
            <p className="text-terminal-error">Accessing street view data...</p>
            <p className="text-terminal-error">Matching with property records...</p>
          </div>
        </div>
      </Terminal>
    </div>
  );
};

export default LocationMap;
