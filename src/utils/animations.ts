
import { useState, useEffect, useCallback } from 'react';

// Hook for creating typewriter text effect
export const useTypewriter = (text: string, speed: number = 30, delay: number = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (delay > 0) {
      timer = setTimeout(() => setIsStarted(true), delay);
      return () => clearTimeout(timer);
    } else {
      setIsStarted(true);
    }
  }, [delay]);
  
  useEffect(() => {
    if (!isStarted) return;
    
    let i = 0;
    const typingTimer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingTimer);
        setIsComplete(true);
      }
    }, speed);
    
    return () => clearInterval(typingTimer);
  }, [text, speed, isStarted]);
  
  return { displayText, isComplete };
};

// Hook for simulating a loading process with percentage
export const useProgressSimulation = (
  duration: number = 3000,
  steps: number = 100,
  delay: number = 0,
  randomize: boolean = false
) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    timer = setTimeout(() => {
      let stepCount = 0;
      const interval = duration / steps;
      
      const progressTimer = setInterval(() => {
        if (stepCount < steps) {
          stepCount++;
          
          // Add randomness to the progress if requested
          if (randomize) {
            // Make progress sometimes stall or jump
            const randomFactor = Math.random();
            if (randomFactor > 0.8) {
              // Fast progress jump
              setProgress(prev => Math.min(prev + (2 / steps) * 100, (stepCount / steps) * 100));
            } else if (randomFactor < 0.2) {
              // Stall slightly
              setProgress(prev => prev);
            } else {
              // Normal progress
              setProgress((stepCount / steps) * 100);
            }
          } else {
            setProgress((stepCount / steps) * 100);
          }
        } else {
          clearInterval(progressTimer);
          setProgress(100);
          setIsComplete(true);
        }
      }, interval);
      
      return () => clearInterval(progressTimer);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [duration, steps, delay, randomize]);
  
  return { progress, isComplete };
};

// Hook for creating a countdown
export const useCountdown = (
  startFrom: number,
  delay: number = 0,
  onComplete?: () => void
) => {
  const [count, setCount] = useState(startFrom);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsRunning(true);
    }, delay);
    
    return () => clearTimeout(delayTimer);
  }, [delay]);
  
  useEffect(() => {
    if (!isRunning) return;
    
    const countdownTimer = setInterval(() => {
      setCount(prevCount => {
        if (prevCount <= 1) {
          clearInterval(countdownTimer);
          setIsComplete(true);
          onComplete && onComplete();
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(countdownTimer);
  }, [isRunning, onComplete]);
  
  const resetCountdown = useCallback(() => {
    setCount(startFrom);
    setIsComplete(false);
    setIsRunning(false);
  }, [startFrom]);
  
  return { count, isRunning, isComplete, resetCountdown };
};

// Hook for creating glitch effect text
export const useGlitchText = (
  originalText: string,
  glitchChars: string = "!<>-_\\/[]{}—=+*^?#________",
  intensity: number = 20, // Higher = more glitching
  delay: number = 0
) => {
  const [displayText, setDisplayText] = useState(originalText);
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsGlitching(true);
    }, delay);
    
    return () => clearTimeout(delayTimer);
  }, [delay]);
  
  useEffect(() => {
    if (!isGlitching) return;
    
    let iteration = 0;
    
    const glitchInterval = setInterval(() => {
      if (iteration >= originalText.length * 2) {
        clearInterval(glitchInterval);
        setDisplayText(originalText);
        return;
      }
      
      // Apply less glitching over time to "resolve" to the correct text
      const glitchProbability = Math.max(0, 1 - (iteration / (originalText.length * 2)));
      
      const newText = originalText
        .split("")
        .map((char, index) => {
          if (index < iteration / 2) {
            return originalText[index];
          }
          
          if (Math.random() < glitchProbability * (intensity / 100)) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          
          return char;
        })
        .join("");
      
      setDisplayText(newText);
      iteration += 1 / 3; // Slow down the resolution
    }, 50);
    
    return () => clearInterval(glitchInterval);
  }, [originalText, glitchChars, intensity, isGlitching]);
  
  return displayText;
};
