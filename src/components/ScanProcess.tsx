
import React, { useState, useEffect } from 'react';
import { Terminal, TerminalOutput } from '@/components/Terminal';
import { useTypewriter, useProgressSimulation } from '@/utils/animations';

interface ScanProcessProps {
  onComplete: () => void;
  metadata: any;
}

const ScanProcess: React.FC<ScanProcessProps> = ({ onComplete, metadata }) => {
  const [stage, setStage] = useState(0);
  
  // Typewriter effects for different scan stages
  const initScan = useTypewriter('Initializing system scan...', 20);
  const fetchingData = useTypewriter('Fetching public records...', 20, 1500);
  const scanningProfiles = useTypewriter('Scanning social media profiles...', 20, 3000);
  const analyzingData = useTypewriter('Cross-referencing data points...', 20, 6000);
  const buildingProfile = useTypewriter('Building comprehensive profile...', 20, 9000);
  
  // Progress simulations for each stage
  const initProgress = useProgressSimulation(1200, 100, 200, true);
  const fetchProgress = useProgressSimulation(2500, 100, 1700, true);
  const scanProgress = useProgressSimulation(2500, 100, 3200, true);
  const analyzeProgress = useProgressSimulation(2800, 100, 6200, true);
  const buildProgress = useProgressSimulation(2200, 100, 9200, true);
  
  useEffect(() => {
    // Track the overall progress to determine when to move to the next component
    const overallComplete = 
      initProgress.isComplete && 
      fetchProgress.isComplete && 
      scanProgress.isComplete && 
      analyzeProgress.isComplete &&
      buildProgress.isComplete;
      
    if (overallComplete) {
      // Add a small delay for effect before moving on
      const timer = setTimeout(() => {
        setStage(5);
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [
    initProgress.isComplete, 
    fetchProgress.isComplete, 
    scanProgress.isComplete, 
    analyzeProgress.isComplete,
    buildProgress.isComplete,
    onComplete
  ]);
  
  // Advance the visible stage based on completed progress
  useEffect(() => {
    if (initProgress.isComplete && stage === 0) setStage(1);
    if (fetchProgress.isComplete && stage === 1) setStage(2);
    if (scanProgress.isComplete && stage === 2) setStage(3);
    if (analyzeProgress.isComplete && stage === 3) setStage(4);
  }, [
    initProgress.isComplete, 
    fetchProgress.isComplete, 
    scanProgress.isComplete, 
    analyzeProgress.isComplete,
    stage
  ]);
  
  // Helper function to render a progress bar
  const renderProgress = (current: number, isComplete: boolean) => (
    <div className="terminal-progress">
      <div 
        className="terminal-progress-bar" 
        style={{ width: `${current}%` }}
      />
    </div>
  );
  
  // Render found metadata for the IP address
  const renderIpMetadata = () => {
    if (stage < 1) return null;
    
    return (
      <div className="mb-3 animate-fade-in">
        <p className="text-terminal-highlight mb-1">IP Address: <span className="text-terminal-error">{metadata.ipAddress}</span></p>
        <p className="text-terminal-highlight mb-1">Location: <span className="text-terminal-error">{metadata.location.city}, {metadata.location.region}, {metadata.location.country}</span></p>
        <p className="text-terminal-highlight mb-1">Browser: <span className="text-terminal-error">{metadata.browserInfo.browser}</span></p>
        <p className="text-terminal-highlight mb-1">OS: <span className="text-terminal-error">{metadata.browserInfo.os}</span></p>
        <p className="text-terminal-highlight mb-1">Device: <span className="text-terminal-error">{metadata.browserInfo.deviceType}</span></p>
      </div>
    );
  };
  
  // Render additional information found during the scan
  const renderScanInfo = () => {
    if (stage < 2) return null;
    
    return (
      <div className="mb-3 animate-fade-in">
        <p className="text-terminal-warning">Found {3 + Math.floor(Math.random() * 5)} social media profiles</p>
        <p className="text-terminal-warning">Detected {2 + Math.floor(Math.random() * 4)} password breaches</p>
        <p className="text-terminal-warning">Located {1 + Math.floor(Math.random() * 3)} possible home addresses</p>
      </div>
    );
  };
  
  // Render analysis information
  const renderAnalysisInfo = () => {
    if (stage < 3) return null;
    
    return (
      <div className="mb-3 animate-fade-in">
        <p className="text-terminal-error">Connected {1 + Math.floor(Math.random() * 3)} relatives</p>
        <p className="text-terminal-error">Found financial activity patterns</p>
        <p className="text-terminal-error">Matching browsing history patterns</p>
      </div>
    );
  };
  
  // Render final building info
  const renderBuildInfo = () => {
    if (stage < 4) return null;
    
    return (
      <div className="mb-3 animate-fade-in">
        <p className="text-terminal-error font-bold">PROFILE COMPLETE</p>
        <p className="text-terminal-error">All data successfully aggregated</p>
        <p className="text-terminal-error">Proceeding to disclosure phase...</p>
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <Terminal>
        <div className="space-y-4">
          <div className="mb-4">
            <p className="terminal-text-accent text-lg mb-2">
              {initScan.displayText}
              {!initScan.isComplete && <span className="terminal-cursor"></span>}
            </p>
            {initScan.isComplete && renderProgress(initProgress.progress, initProgress.isComplete)}
            {renderIpMetadata()}
          </div>
          
          {stage >= 1 && (
            <div className="mb-4">
              <p className="terminal-text-accent text-lg mb-2">
                {fetchingData.displayText}
                {!fetchingData.isComplete && <span className="terminal-cursor"></span>}
              </p>
              {fetchingData.isComplete && renderProgress(fetchProgress.progress, fetchProgress.isComplete)}
            </div>
          )}
          
          {stage >= 2 && (
            <div className="mb-4">
              <p className="terminal-text-accent text-lg mb-2">
                {scanningProfiles.displayText}
                {!scanningProfiles.isComplete && <span className="terminal-cursor"></span>}
              </p>
              {scanningProfiles.isComplete && renderProgress(scanProgress.progress, scanProgress.isComplete)}
              {renderScanInfo()}
            </div>
          )}
          
          {stage >= 3 && (
            <div className="mb-4">
              <p className="terminal-text-accent text-lg mb-2">
                {analyzingData.displayText}
                {!analyzingData.isComplete && <span className="terminal-cursor"></span>}
              </p>
              {analyzingData.isComplete && renderProgress(analyzeProgress.progress, analyzeProgress.isComplete)}
              {renderAnalysisInfo()}
            </div>
          )}
          
          {stage >= 4 && (
            <div className="mb-4">
              <p className="terminal-text-accent text-lg mb-2">
                {buildingProfile.displayText}
                {!buildingProfile.isComplete && <span className="terminal-cursor"></span>}
              </p>
              {buildingProfile.isComplete && renderProgress(buildProgress.progress, buildProgress.isComplete)}
              {renderBuildInfo()}
            </div>
          )}
        </div>
      </Terminal>
    </div>
  );
};

export default ScanProcess;
