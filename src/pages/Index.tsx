
import React, { useState, useEffect } from 'react';
import ScanProcess from '@/components/ScanProcess';
import PersonalInfo from '@/components/PersonalInfo';
import LocationMap from '@/components/LocationMap';
import Countdown from '@/components/Countdown';
import EducationalReveal from '@/components/EducationalReveal';
import { fetchUserMetadata, generateFakePersonalData, UserMetadata } from '@/utils/dataCollection';

const Index = () => {
  const [stage, setStage] = useState<number>(0);
  const [metadata, setMetadata] = useState<UserMetadata | null>(null);
  const [personalData, setPersonalData] = useState<any>(null);
  
  // Fetch user metadata on initial load
  useEffect(() => {
    const getMetadata = async () => {
      try {
        const data = await fetchUserMetadata();
        setMetadata(data);
        
        // Generate fake personal data based on the IP address
        const fakeData = generateFakePersonalData(data.ipAddress);
        setPersonalData(fakeData);
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    };
    
    getMetadata();
  }, []);
  
  // Reset the application to start over
  const handleReset = () => {
    setStage(0);
  };
  
  // Render the appropriate component based on the current stage
  const renderStage = () => {
    if (!metadata || !personalData) {
      // Loading state while we fetch the initial data
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-terminal-accent animate-pulse text-xl">Initializing system...</div>
        </div>
      );
    }
    
    switch (stage) {
      case 0:
        return <ScanProcess metadata={metadata} onComplete={() => setStage(1)} />;
      case 1:
        return <PersonalInfo metadata={metadata} personalData={personalData} onComplete={() => setStage(2)} />;
      case 2:
        return <LocationMap location={metadata.location} onComplete={() => setStage(3)} />;
      case 3:
        return <Countdown onComplete={() => setStage(4)} />;
      case 4:
        return <EducationalReveal onReset={handleReset} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background py-12 relative bg-terminal-pattern bg-[length:30px_30px]">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-background/80 pointer-events-none"></div>
      
      {/* Header */}
      <header className="w-full text-center mb-8 z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-error">
          You've Been <span className="text-terminal-warning">Doxxed!</span>
        </h1>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center z-10 animate-page-transition">
        {renderStage()}
      </main>
      
      {/* Footer - only visible on education page */}
      {stage !== 4 && (
        <footer className="w-full text-center mt-8 z-10">
          <p className="text-terminal-foreground/50 text-sm">
            This is an educational demonstration. No actual personal data is being collected or stored.
          </p>
        </footer>
      )}
    </div>
  );
};

export default Index;
