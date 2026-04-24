import { Zap, ChevronDown, Check, Palette } from 'lucide-react';
import { Button, cn } from './ui';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const THEMES = [
  { id: 'light', name: 'Original', color: 'bg-white', border: 'border-slate-200', isDark: false },
  { id: 'dark', name: 'Dark Mode', color: 'bg-slate-900', border: 'border-slate-700', isDark: true },
  { id: 'professional', name: 'Modern Prof.', color: 'bg-[#1E2761]', border: 'border-[#408EC6]', isDark: true },
  { id: 'earthy', name: 'Earthy Min.', color: 'bg-[#B85042]', border: 'border-[#A7BEAE]', isDark: false },
  { id: 'tech', name: 'Vibrant Tech', color: 'bg-[#2A3132]', border: 'border-[#90AFC5]', isDark: true },
  { id: 'eco', name: 'Eco-Forest', color: 'bg-[#2C5F2D]', border: 'border-[#97BC62]', isDark: true },
  { id: 'romantic', name: 'Romantic Rose', color: 'bg-[#962E2A]', border: 'border-[#E3867D]', isDark: false },
  { id: 'beach', name: 'Summer Beach', color: 'bg-[#66A5AD]', border: 'border-[#07575B]', isDark: false },
  { id: 'rustic', name: 'Artisan Rustic', color: 'bg-[#46211A]', border: 'border-[#A43820]', isDark: true },
  { id: 'pastel', name: 'Pastel Blue', color: 'bg-[#89ABE3]', border: 'border-[#EA738D]', isDark: false },
  { id: 'sunset', name: 'Warm Sunset', color: 'bg-[#CA3E47]', border: 'border-[#E59572]', isDark: true },
  { id: 'contrast', name: 'High Contrast', color: 'bg-black', border: 'border-white', isDark: true },
];

export function Header({ currentView, onViewChange, isHealthy }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = () => {
      const activeTheme = localStorage.getItem('theme') || 'light';
      setTheme(activeTheme);
      
      const selectedTheme = THEMES.find(t => t.id === activeTheme) || THEMES[0];
      
      // Remove all previous theme classes
      THEMES.forEach(t => {
        if (t.id !== 'dark' && t.id !== 'light') {
          root.classList.remove(`theme-${t.id}`);
        }
      });
      root.classList.remove('dark');
      
      // Apply new theme
      if (selectedTheme?.isDark || activeTheme === 'custom') {
        root.classList.add('dark');
      }
      
      if (activeTheme !== 'light' && activeTheme !== 'dark' && activeTheme !== 'custom') {
        root.classList.add(`theme-${activeTheme}`);
      }
    };

    applyTheme();
    window.addEventListener('storage-settings-updated', applyTheme);
    return () => window.removeEventListener('storage-settings-updated', applyTheme);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onViewChange('home')}>
            <div className="bg-primary rounded-lg p-1.5 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight">WebMorph</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Bulk Image Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-[10px] font-bold uppercase tracking-tight font-mono">
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
              onClick={() => onViewChange('home')} 
              className={cn("hover:text-foreground transition-colors", currentView === 'home' && "text-foreground font-bold underline decoration-primary decoration-2 underline-offset-8")}
            >
              Convert
            </button>
            <button 
              onClick={() => onViewChange('custom')} 
              className={cn("hover:text-foreground transition-colors", currentView === 'custom' && "text-foreground font-bold underline decoration-primary decoration-2 underline-offset-8")}
            >
              Customize
            </button>
            <button 
              onClick={() => onViewChange('docs')} 
              className={cn("hover:text-foreground transition-colors", currentView === 'docs' && "text-foreground font-bold underline decoration-primary decoration-2 underline-offset-8")}
            >
              Docs
            </button>
            <button 
              onClick={() => onViewChange('dev')} 
              className={cn("hover:text-foreground transition-colors", currentView === 'dev' && "text-foreground font-bold underline decoration-primary decoration-2 underline-offset-8")}
            >
              Developer
            </button>
          </nav>
          
          <div className="flex items-center gap-3">
             <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onViewChange('custom')}
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-all"
             >
                <Palette className="h-5 w-5" />
             </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
