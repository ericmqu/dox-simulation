
import React, { useState, useEffect } from 'react';
import { Terminal } from '@/components/Terminal';
import { generateFakePersonalData, generateBreachEvents } from '@/utils/dataCollection';
import { useTypewriter } from '@/utils/animations';

interface PersonalInfoProps {
  metadata: any;
  personalData: any;
  onComplete: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ metadata, personalData, onComplete }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const breachEvents = generateBreachEvents(4);
  
  const headerText = useTypewriter('PERSONAL INFORMATION EXTRACTED', 40);
  
  useEffect(() => {
    // Wait for the typing effect to finish before showing the data
    if (headerText.isComplete) {
      setTimeout(() => {
        setIsRevealed(true);
      }, 800);
    }
  }, [headerText.isComplete]);
  
  // Add a delay before moving to the next component
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        onComplete();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [isRevealed, onComplete]);
  
  const renderDataSection = (title: string, content: React.ReactNode) => (
    <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <h3 className="text-terminal-accent mb-2 uppercase text-sm tracking-widest">{title}</h3>
      <div className="bg-terminal-accent/10 p-3 rounded border border-terminal-accent/30">
        {content}
      </div>
    </div>
  );
  
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <Terminal title="DATA EXTRACTION">
        <div className="py-2">
          <h2 className="text-terminal-error text-xl font-bold mb-6 glitch-effect" data-text="PERSONAL INFORMATION EXTRACTED">
            {headerText.displayText}
            {!headerText.isComplete && <span className="terminal-cursor"></span>}
          </h2>
          
          {isRevealed && (
            <div className="space-y-4">
              {renderDataSection("Basic Information", (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-terminal-highlight mb-1">Name: <span className="text-terminal-error">{personalData.name}</span></p>
                    <p className="text-terminal-highlight mb-1">Email: <span className="text-terminal-error">{personalData.email}</span></p>
                    <p className="text-terminal-highlight mb-1">Phone: <span className="text-terminal-error">{personalData.phoneNumber}</span></p>
                    <p className="text-terminal-highlight mb-1">Date of Birth: <span className="text-terminal-error">{personalData.dateOfBirth}</span></p>
                  </div>
                  <div>
                    <p className="text-terminal-highlight mb-1">IP Address: <span className="text-terminal-error">{metadata.ipAddress}</span></p>
                    <p className="text-terminal-highlight mb-1">Location: <span className="text-terminal-error">{metadata.location.city}, {metadata.location.region}</span></p>
                    <p className="text-terminal-highlight mb-1">Browser: <span className="text-terminal-error">{metadata.browserInfo.browser}</span></p>
                    <p className="text-terminal-highlight mb-1">Device: <span className="text-terminal-error">{metadata.browserInfo.deviceType} - {metadata.browserInfo.os}</span></p>
                  </div>
                </div>
              ))}
              
              {renderDataSection("Social Media Accounts", (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {personalData.socialAccounts.map((account: any, index: number) => (
                    <p key={index} className="text-terminal-highlight">
                      {account.platform}: <span className="text-terminal-error">{account.username}</span>
                    </p>
                  ))}
                </div>
              ))}
              
              {renderDataSection("Relatives Identified", (
                <div className="flex flex-col gap-1">
                  {personalData.relatives.map((relative: string, index: number) => (
                    <p key={index} className="text-terminal-highlight">
                      • <span className="text-terminal-error">{relative}</span>
                    </p>
                  ))}
                </div>
              ))}
              
              {renderDataSection("Leaked Passwords", (
                <div className="flex flex-col gap-1">
                  {personalData.leakedPasswords.map((password: string, index: number) => (
                    <p key={index} className="text-terminal-highlight">
                      • <span className="text-terminal-error">{password}</span>
                    </p>
                  ))}
                </div>
              ))}
              
              {renderDataSection("Data Breach History", (
                <div className="flex flex-col gap-1">
                  {breachEvents.map((event, index) => (
                    <p key={index} className="text-terminal-highlight">
                      {event.date}: <span className="text-terminal-error">{event.site} data breach</span>
                    </p>
                  ))}
                </div>
              ))}
              
              {renderDataSection("Possible Addresses", (
                <div className="flex flex-col gap-1">
                  {personalData.possibleAddresses.map((address: string, index: number) => (
                    <p key={index} className="text-terminal-highlight">
                      • <span className="text-terminal-error">{address}</span>
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </Terminal>
    </div>
  );
};

export default PersonalInfo;
