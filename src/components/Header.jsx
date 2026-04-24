import { Moon, Sun, Zap } from 'lucide-react';
import { Button, cn } from './ui';
import { useEffect, useState } from 'react';

export function Header({ currentView, onViewChange, isHealthy }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('home')}>
            <div className="bg-primary rounded-lg p-1.5 shadow-lg shadow-primary/20">
              <Zap className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight">WebMorph</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Bulk WebP Converter</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted border text-[10px] font-bold uppercase tracking-tight">
            <div className={cn("h-2 w-2 rounded-full", isHealthy ? "bg-emerald-500 animate-pulse" : "bg-amber-500")} />
            <span className="text-muted-foreground">System:</span>
            <span className={isHealthy ? "text-emerald-600" : "text-amber-600"}>
              {isHealthy ? "Stable" : "High Load"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <button 
              onClick={() => onViewChange('docs')} 
              className={cn("hover:text-foreground transition-colors", currentView === 'docs' && "text-foreground font-bold")}
            >
              Documentation
            </button>
            <button 
              onClick={() => onViewChange('dev')} 
              className={cn("hover:text-foreground transition-colors", currentView === 'dev' && "text-foreground font-bold")}
            >
              The Developer
            </button>
          </nav>
          
          <div className="h-6 w-[1px] bg-border hidden md:block" />
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'light' ? (
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
