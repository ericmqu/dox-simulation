
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Terminal } from "@/components/Terminal";
import { useTypewriter } from "@/utils/animations";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const errorText = useTypewriter("ERROR 404: PAGE NOT FOUND", 40);
  const pathText = useTypewriter(`Attempted to access: ${location.pathname}`, 30, 1500);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background py-12 bg-terminal-pattern bg-[length:30px_30px]">
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-background/80 pointer-events-none"></div>
      
      <div className="w-full max-w-lg px-4 z-10">
        <Terminal title="SYSTEM ERROR">
          <div className="py-8 text-center">
            <h1 className="text-terminal-error text-3xl font-bold mb-6 glitch-effect" data-text="ERROR 404: PAGE NOT FOUND">
              {errorText.displayText}
              {!errorText.isComplete && <span className="terminal-cursor"></span>}
            </h1>
            
            <div className="terminal-code-block text-left mb-8">
              <p className="text-terminal-foreground">
                {pathText.displayText}
                {!pathText.isComplete && <span className="terminal-cursor"></span>}
              </p>
              <p className="text-terminal-error mt-4">Access denied. Target not found in database.</p>
            </div>
            
            <Button 
              className="flex items-center gap-2 bg-terminal-accent hover:bg-terminal-accent/80 text-terminal" 
              onClick={() => window.location.href = '/'}
            >
              <Home size={18} />
              Return to Home
            </Button>
          </div>
        </Terminal>
      </div>
    </div>
  );
};

export default NotFound;
