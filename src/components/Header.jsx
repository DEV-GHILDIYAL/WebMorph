import { Moon, Sun, Zap } from 'lucide-react';
import { Button, cn } from './ui';
import { useEffect, useState } from 'react';

const THEMES = [
  { id: 'light', name: 'Clean', color: 'bg-white border-slate-200' },
  { id: 'dark', name: 'Dark', color: 'bg-slate-900 border-slate-700' },
  { id: 'midnight', name: 'Midnight', color: 'bg-blue-950 border-blue-900' },
  { id: 'cyber', name: 'Cyber', color: 'bg-black border-cyan-500' },
  { id: 'forest', name: 'Forest', color: 'bg-emerald-950 border-emerald-800' },
  { id: 'sunset', name: 'Sunset', color: 'bg-purple-950 border-orange-500' },
  { id: 'nord', name: 'Nord', color: 'bg-slate-700 border-slate-500' },
];

export function Header({ currentView, onViewChange, isHealthy }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Remove all theme classes first
    const root = document.documentElement;
    THEMES.forEach(t => root.classList.remove(t.id === 'dark' ? 'dark' : `theme-${t.id}`));
    
    // Apply selected theme
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme !== 'light') {
      root.classList.add(`theme-${theme}`);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

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

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted border text-[10px] font-bold uppercase tracking-tight font-mono">
            <div className={cn("h-2 w-2 rounded-full", isHealthy ? "bg-emerald-500 animate-pulse outline outline-offset-2 outline-emerald-500/30" : "bg-amber-500")} />
            <span className="text-muted-foreground">Pulse:</span>
            <span className={isHealthy ? "text-emerald-600" : "text-amber-600"}>
              {isHealthy ? "Healthy" : "Congested"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex gap-6 text-sm font-medium text-muted-foreground mr-4">
            <button 
              onClick={() => onViewChange('docs')} 
              className={cn("hover:text-foreground transition-colors", currentView === 'docs' && "text-foreground font-bold")}
            >
              Docs
            </button>
            <button 
              onClick={() => onViewChange('dev')} 
              className={cn("hover:text-foreground transition-colors", currentView === 'dev' && "text-foreground font-bold")}
            >
              Developer
            </button>
          </nav>
          
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-muted/50 border border-border/50">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                title={t.name}
                className={cn(
                  "h-5 w-5 rounded-full border-2 transition-all duration-300 hover:scale-125",
                  t.color,
                  theme === t.id ? "scale-110 border-primary shadow-sm" : "border-transparent opacity-60 hover:opacity-100"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
