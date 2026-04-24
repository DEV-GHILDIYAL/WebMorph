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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const applyTheme = () => {
      const activeTheme = localStorage.getItem('theme') || 'light';
      setTheme(activeTheme);
      const selectedTheme = THEMES.find(t => t.id === activeTheme) || THEMES[0];
      
      THEMES.forEach(t => {
        if (t.id !== 'dark' && t.id !== 'light') {
          document.documentElement.classList.remove(`theme-${t.id}`);
        }
      });
      document.documentElement.classList.remove('dark');
      
      if (selectedTheme?.isDark || activeTheme === 'custom') {
        document.documentElement.classList.add('dark');
      }
      
      if (activeTheme !== 'light' && activeTheme !== 'dark' && activeTheme !== 'custom') {
        document.documentElement.classList.add(`theme-${activeTheme}`);
      }
    };

    applyTheme();
    window.addEventListener('storage-settings-updated', applyTheme);
    return () => window.removeEventListener('storage-settings-updated', applyTheme);
  }, []);

  const NavContent = ({ mobile = false }) => (
    <>
      <button 
        onClick={() => { onViewChange('home'); setIsMobileMenuOpen(false); }} 
        className={cn("hover:text-foreground transition-colors text-left", currentView === 'home' && !mobile && "text-foreground font-bold underline decoration-primary decoration-2 underline-offset-8", currentView === 'home' && mobile && "text-primary font-bold")}
      >
        Convert
      </button>
      <button 
        onClick={() => { onViewChange('custom'); setIsMobileMenuOpen(false); }} 
        className={cn("hover:text-foreground transition-colors text-left", currentView === 'custom' && !mobile && "text-foreground font-bold underline decoration-primary decoration-2 underline-offset-8", currentView === 'custom' && mobile && "text-primary font-bold")}
      >
        Studio
      </button>
      <button 
        onClick={() => { onViewChange('docs'); setIsMobileMenuOpen(false); }} 
        className={cn("hover:text-foreground transition-colors text-left", currentView === 'docs' && !mobile && "text-foreground font-bold underline decoration-primary decoration-2 underline-offset-8", currentView === 'docs' && mobile && "text-primary font-bold")}
      >
        Documentation
      </button>
      <button 
        onClick={() => { onViewChange('dev'); setIsMobileMenuOpen(false); }} 
        className={cn("hover:text-foreground transition-colors text-left", currentView === 'dev' && !mobile && "text-foreground font-bold underline decoration-primary decoration-2 underline-offset-8", currentView === 'dev' && mobile && "text-primary font-bold")}
      >
        Developer
      </button>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onViewChange('home')}>
              <div className="bg-primary rounded-lg p-1.5 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-primary-foreground fill-current" />
              </div>
              <div className="hidden xsm:block">
                <h1 className="text-xl font-bold tracking-tight leading-none">WebMorph</h1>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold mt-0.5">Bulk Image Engine</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-[9px] font-bold uppercase tracking-tight font-mono">
              <div className={cn("h-2 w-2 rounded-full", isHealthy ? "bg-emerald-500 animate-pulse outline outline-offset-2 outline-emerald-500/30" : "bg-amber-500")} />
              <span className="text-muted-foreground">Pulse:</span>
              <span className={isHealthy ? "text-emerald-600" : "text-amber-600"}>
                {isHealthy ? "Healthy" : "Congested"}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex gap-8 text-sm font-medium text-muted-foreground mr-4">
              <NavContent />
            </nav>
            
            <div className="flex items-center gap-2">
               <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onViewChange('custom')}
                  className="rounded-full hover:bg-primary/10 hover:text-primary transition-all sm:flex hidden"
               >
                  <Palette className="h-5 w-5" />
               </Button>

               {/* Mobile Menu Toggle */}
               <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors relative z-[60]"
               >
                  <div className="w-6 h-5 flex flex-col justify-between items-end">
                     <motion.span animate={{ width: '100%', rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 9 : 0 }} className="h-0.5 bg-foreground block origin-right" />
                     <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1, width: '70%' }} className="h-0.5 bg-foreground block" />
                     <motion.span animate={{ width: isMobileMenuOpen ? '100%' : '50%', rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -9 : 0 }} className="h-0.5 bg-foreground block origin-right" />
                  </div>
               </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay (Moved outside sticky header for absolute solid background) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] lg:hidden pt-24 px-8 border-l shadow-2xl bg-background/98 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-8 text-2xl font-black tracking-tighter uppercase">
              <NavContent mobile={true} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
