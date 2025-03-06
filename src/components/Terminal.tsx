
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TerminalProps {
  className?: string;
  children: ReactNode;
  title?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ 
  children, 
  className,
  title = "SYSTEM SCAN" 
}) => {
  return (
    <div className={cn("terminal-container", className)}>
      <div className="terminal-header">
        <div className="terminal-header-dot bg-terminal-error"></div>
        <div className="terminal-header-dot bg-terminal-warning"></div>
        <div className="terminal-header-dot bg-terminal-success"></div>
        <div className="terminal-header-title">{title}</div>
      </div>
      
      <div className="scanning-effect">
        {children}
      </div>
    </div>
  );
};

interface TerminalOutputProps {
  children: ReactNode;
  className?: string;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ children, className }) => {
  return (
    <div className={cn("terminal-text my-1", className)}>
      {children}
    </div>
  );
};

interface TerminalCommandProps {
  command: string;
  output?: ReactNode;
}

export const TerminalCommand: React.FC<TerminalCommandProps> = ({ command, output }) => {
  return (
    <div className="mb-3">
      <div className="flex">
        <span className="text-terminal-success mr-2">$</span>
        <span>{command}</span>
      </div>
      {output && <div className="pl-5 mt-1">{output}</div>}
    </div>
  );
};
