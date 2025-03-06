
import React, { useState, useEffect } from 'react';
import { Terminal } from '@/components/Terminal';
import { useTypewriter } from '@/utils/animations';
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  Globe, 
  Key, 
  FileText,
  Refresh
} from "lucide-react";

interface EducationalRevealProps {
  onReset: () => void;
}

const EducationalReveal: React.FC<EducationalRevealProps> = ({ onReset }) => {
  const [showContent, setShowContent] = useState(false);
  
  const headerText = useTypewriter('THIS WAS A SIMULATION', 60);
  const subText = useTypewriter('But this happens in real life. Every day.', 40, 2000);
  const warningText = useTypewriter('Your data is out there. Here\'s how to protect yourself.', 40, 4000);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const renderProtectionTip = (icon: React.ReactNode, title: string, description: string) => (
    <div className="terminal-container p-4 hover:border-terminal-accent/50 transition-colors duration-300">
      <div className="flex items-start gap-3">
        <div className="text-terminal-accent shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-terminal-accent font-semibold mb-2">{title}</h3>
          <p className="text-sm text-terminal-foreground/90">{description}</p>
        </div>
      </div>
    </div>
  );
  
  const handleReset = () => {
    onReset();
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Terminal title="DISCLOSURE">
        <div className="py-4">
          <h2 className="text-terminal-success text-3xl font-bold mb-6 text-center">
            {headerText.displayText}
            {!headerText.isComplete && <span className="terminal-cursor"></span>}
          </h2>
          
          <div className="mb-8 text-center">
            <p className="text-terminal-warning text-xl mb-4">
              {subText.displayText}
              {!subText.isComplete && <span className="terminal-cursor"></span>}
            </p>
            <p className="text-terminal-foreground text-xl">
              {warningText.displayText}
              {!warningText.isComplete && <span className="terminal-cursor"></span>}
            </p>
          </div>
          
          {showContent && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h3 className="text-terminal-accent text-xl mb-4">What just happened?</h3>
                <div className="terminal-code-block">
                  <p className="mb-3">
                    This simulation demonstrates how easily someone could collect information about you from public sources. While this was just a demonstration with mostly fake data, real doxxing incidents can reveal much more personal information.
                  </p>
                  <p>
                    The only real data used in this simulation was your approximate location based on your IP address, your browser type, and operating system - all information that any website you visit can access.
                  </p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-terminal-accent text-xl mb-4">How to protect yourself online:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderProtectionTip(
                    <Shield size={24} />, 
                    "Use a VPN", 
                    "A Virtual Private Network encrypts your internet connection and masks your IP address, making it harder for others to track your location and browsing habits."
                  )}
                  {renderProtectionTip(
                    <Lock size={24} />, 
                    "Password Manager", 
                    "Use a password manager to create and store strong, unique passwords for each of your accounts. This prevents hackers from accessing multiple accounts if one is compromised."
                  )}
                  {renderProtectionTip(
                    <AlertTriangle size={24} />, 
                    "Limit Personal Information", 
                    "Be cautious about what you share online. Avoid posting your full name, address, phone number, or other identifying information on public platforms."
                  )}
                  {renderProtectionTip(
                    <Globe size={24} />, 
                    "Check Privacy Settings", 
                    "Regularly review and update the privacy settings on your social media accounts to control who can see your posts and personal information."
                  )}
                  {renderProtectionTip(
                    <Key size={24} />, 
                    "Two-Factor Authentication", 
                    "Enable two-factor authentication on all your important accounts to add an extra layer of security beyond just a password."
                  )}
                  {renderProtectionTip(
                    <FileText size={24} />, 
                    "Check Data Breaches", 
                    "Use services like Have I Been Pwned to check if your email has been involved in a data breach, and change passwords for any affected accounts."
                  )}
                </div>
              </div>
              
              <div className="flex justify-center mt-10">
                <Button 
                  className="flex items-center gap-2 bg-terminal-success hover:bg-terminal-success/80 text-terminal"
                  onClick={handleReset}
                >
                  <Refresh size={18} />
                  Run Simulation Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </Terminal>
      
      <div className="text-center text-sm text-terminal-foreground/70 mt-6 animate-fade-in">
        <p>This is an educational tool created to raise awareness about online privacy and security.</p>
        <p>No real personal data is collected, stored, or shared during this simulation.</p>
      </div>
    </div>
  );
};

export default EducationalReveal;
