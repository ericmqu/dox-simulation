
import React, { useState, useEffect } from 'react';
import { Terminal } from '@/components/Terminal';
import { useTypewriter, useCountdown, useGlitchText } from '@/utils/animations';

interface CountdownProps {
  onComplete: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ onComplete }) => {
  const [showWarnings, setShowWarnings] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  
  const headerText = useTypewriter('CRITICAL SECURITY ALERT', 40);
  const subText = useTypewriter('Your information has been compromised', 40, 1500);
  const leakText = useTypewriter('Preparing to publish your full personal data...', 40, 3000);
  
  // Countdown from 10 to 0
  const { count, isRunning, isComplete } = useCountdown(10, 4000, () => {
    setIsGlitching(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  });
  
  // Show warning messages with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWarnings(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Apply glitch effect when countdown is about to end
  const glitchEffect = count <= 3 || isGlitching;
  
  const glitchText = useGlitchText("FULL DATA PUBLICATION IMMINENT", "!<>-_\\/[]{}—=+*^?#", 70, 0);
  
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <Terminal title="SECURITY ALERT" className={glitchEffect ? "animate-pulse-error" : ""}>
        <div className="py-2">
          <h2 className={`text-terminal-error text-xl font-bold mb-6 ${glitchEffect ? "glitch-effect" : ""}`} data-text="CRITICAL SECURITY ALERT">
            {headerText.displayText}
            {!headerText.isComplete && <span className="terminal-cursor"></span>}
          </h2>
          
          <div className="mb-8">
            <p className="text-terminal-warning text-lg mb-4">
              {subText.displayText}
              {!subText.isComplete && <span className="terminal-cursor"></span>}
            </p>
            
            {showWarnings && (
              <div className="space-y-3 animate-fade-in">
                <p className="text-terminal-error">● Your data has been sold to a foreign entity</p>
                <p className="text-terminal-error">● Hackers now have access to your personal details</p>
                <p className="text-terminal-error">● Your financial records have been compromised</p>
                <p className="text-terminal-error">● Your online accounts are at risk of immediate takeover</p>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <p className="text-terminal-error text-lg mb-6">
              {leakText.displayText}
              {!leakText.isComplete && <span className="terminal-cursor"></span>}
            </p>
            
            {isRunning && (
              <div className="flex flex-col items-center animate-fade-in">
                <div className={`text-5xl font-bold mb-4 ${count <= 3 ? "text-terminal-error animate-pulse-error" : "text-terminal-warning"}`}>
                  {count}
                </div>
                
                <p className={`text-xl ${glitchEffect ? "glitch-effect" : "text-terminal-error"}`} data-text="FULL DATA PUBLICATION IMMINENT">
                  {glitchEffect ? glitchText : "FULL DATA PUBLICATION IMMINENT"}
                </p>
              </div>
            )}
          </div>
          
          {isGlitching && (
            <div className="animate-fade-in">
              <div className="h-10 w-full bg-terminal-error my-4 animate-glitch flex items-center justify-center">
                <span className="text-terminal text-lg font-bold">SYSTEM CORRUPTED</span>
              </div>
            </div>
          )}
        </div>
      </Terminal>
    </div>
  );
};

export default Countdown;
