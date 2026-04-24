import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Image as ImageIcon, Trash2, Sliders, Check, Sparkles, RefreshCcw } from 'lucide-react';
import { Button, cn } from './ui';
import { settingsStore } from '../lib/db';

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

export function CustomSettings() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [bgBlur, setBgBlur] = useState(parseInt(localStorage.getItem('bgBlur') || '20'));
  const [bgOpacity, setBgOpacity] = useState(parseInt(localStorage.getItem('bgOpacity') || '40'));
  const [bgImage, setBgImage] = useState(null);

  // Architect Colors
  const [customPrimary, setCustomPrimary] = useState(localStorage.getItem('customPrimary') || '#408EC6');
  const [customBg, setCustomBg] = useState(localStorage.getItem('customBg') || '#0f172a');
  const [customH1, setCustomH1] = useState(localStorage.getItem('customH1') || '#f8fafc');
  const [customH2, setCustomH2] = useState(localStorage.getItem('customH2') || '#f1f5f9');
  const [customH3, setCustomH3] = useState(localStorage.getItem('customH3') || '#e2e8f0');
  const [customH4, setCustomH4] = useState(localStorage.getItem('customH4') || '#cbd5e1');
  const [customH5, setCustomH5] = useState(localStorage.getItem('customH5') || '#94a3b8');
  const [customH6, setCustomH6] = useState(localStorage.getItem('customH6') || '#64748b');
  const [customP, setCustomP] = useState(localStorage.getItem('customP') || '#94a3b8');
  const [customLink, setCustomLink] = useState(localStorage.getItem('customLink') || '#408EC6');
  const [customBorder, setCustomBorder] = useState(localStorage.getItem('customBorder') || '#334155');
  const [isGradient, setIsGradient] = useState(localStorage.getItem('isGradient') === 'true');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedImg = await settingsStore.get('backgroundImage');
    if (savedImg) {
      setBgImage(savedImg);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target.result;
      setBgImage(dataUrl);
      await settingsStore.set('backgroundImage', dataUrl);
      window.dispatchEvent(new Event('storage-settings-updated'));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = async () => {
    setBgImage(null);
    await settingsStore.del('backgroundImage');
    window.dispatchEvent(new Event('storage-settings-updated'));
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new Event('storage-settings-updated'));
  };

  const handleCustomColor = (key, val, setter) => {
    setter(val);
    localStorage.setItem(key, val);
    if (theme !== 'custom') {
      updateTheme('custom');
    } else {
      window.dispatchEvent(new Event('storage-settings-updated'));
    }
  };

  const handleGradientToggle = () => {
    const newState = !isGradient;
    setIsGradient(newState);
    localStorage.setItem('isGradient', newState);
    if (theme !== 'custom') updateTheme('custom');
    else window.dispatchEvent(new Event('storage-settings-updated'));
  };

  const handleBlurChange = (val) => {
    setBgBlur(val);
    localStorage.setItem('bgBlur', val);
    window.dispatchEvent(new Event('storage-settings-updated'));
  };

  const handleOpacityChange = (val) => {
    setBgOpacity(val);
    localStorage.setItem('bgOpacity', val);
    window.dispatchEvent(new Event('storage-settings-updated'));
  };

  const resetAll = async () => {
    localStorage.setItem('theme', 'light');
    localStorage.setItem('bgBlur', '20');
    localStorage.setItem('bgOpacity', '40');
    localStorage.setItem('customPrimary', '#408EC6');
    localStorage.setItem('customBg', '#0f172a');
    localStorage.setItem('customH1', '#f8fafc');
    localStorage.setItem('customH2', '#f1f5f9');
    localStorage.setItem('customH3', '#e2e8f0');
    localStorage.setItem('customH4', '#cbd5e1');
    localStorage.setItem('customH5', '#94a3b8');
    localStorage.setItem('customH6', '#64748b');
    localStorage.setItem('customP', '#94a3b8');
    localStorage.setItem('customLink', '#408EC6');
    localStorage.setItem('customBorder', '#334155');
    localStorage.setItem('isGradient', 'false');
    await settingsStore.del('backgroundImage');
    setTheme('light');
    setBgBlur(20);
    setBgOpacity(40);
    setBgImage(null);
    setCustomPrimary('#408EC6');
    setCustomBg('#0f172a');
    setCustomH1('#f8fafc');
    setCustomH2('#f1f5f9');
    setCustomH3('#e2e8f0');
    setCustomH4('#cbd5e1');
    setCustomH5('#94a3b8');
    setCustomH6('#64748b');
    setCustomP('#94a3b8');
    setCustomLink('#408EC6');
    setCustomBorder('#334155');
    setIsGradient(false);
    window.dispatchEvent(new Event('storage-settings-updated'));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-32"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
             <h2 className="text-3xl font-bold tracking-tight">Studio</h2>
             <span className="px-2 py-0.5 rounded-md bg-primary/20 text-primary text-[10px] font-black uppercase">Beta</span>
          </div>
          <p className="text-muted-foreground">Architect your perfect conversion workspace.</p>
        </div>
        <Button variant="outline" size="sm" onClick={resetAll} className="gap-2 text-destructive hover:bg-destructive/10">
          <RefreshCcw size={14} />
          Reset Everything
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Theme Section */}
        <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold">Theme Collection</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => updateTheme(t.id)}
                className={cn(
                  "p-3 rounded-2xl border-2 text-left transition-all hover:scale-105",
                  theme === t.id ? "border-primary bg-primary/10" : "border-border/50 bg-background/50"
                )}
              >
                <div className={cn("h-8 w-full rounded-lg mb-2 shadow-sm border", t.color, t.border)} />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis">{t.name}</span>
                  {theme === t.id && <Check className="h-3 w-3 text-primary" />}
                </div>
              </button>
            ))}
            
            <button
               onClick={() => updateTheme('custom')}
               className={cn(
                 "p-3 rounded-2xl border-2 text-left transition-all hover:scale-105 col-span-full mt-2",
                 theme === 'custom' ? "border-primary bg-primary/10" : "border-dashed border-border/50 bg-background/50"
               )}
            >
               <div className="flex items-center justify-between">
                 <span className="text-xs font-black uppercase tracking-tighter flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Custom Architect Theme
                 </span>
                 {theme === 'custom' && <Check className="h-3 w-3 text-primary" />}
               </div>
            </button>
          </div>
        </div>

        {/* Custom Architect Controls */}
        {theme === 'custom' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-primary/5 border-2 border-primary/20 space-y-8"
          >
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold">Architect Mode</h3>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Gradient</span>
                  <button 
                    onClick={handleGradientToggle}
                    className={cn(
                      "w-10 h-5 rounded-full transition-all relative",
                      isGradient ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-3 h-3 rounded-full bg-white transition-all",
                      isGradient ? "left-6" : "left-1"
                    )} />
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Background</label>
                  <input 
                    type="color" 
                    value={customBg} 
                    onChange={(e) => handleCustomColor('customBg', e.target.value, setCustomBg)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Borders</label>
                  <input 
                    type="color" 
                    value={customBorder} 
                    onChange={(e) => handleCustomColor('customBorder', e.target.value, setCustomBorder)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Links</label>
                  <input 
                    type="color" 
                    value={customLink} 
                    onChange={(e) => handleCustomColor('customLink', e.target.value, setCustomLink)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
               </div>
               
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">H1 Color</label>
                  <input 
                    type="color" 
                    value={customH1} 
                    onChange={(e) => handleCustomColor('customH1', e.target.value, setCustomH1)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">H2 Color</label>
                  <input 
                    type="color" 
                    value={customH2} 
                    onChange={(e) => handleCustomColor('customH2', e.target.value, setCustomH2)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">H3 Color</label>
                  <input 
                    type="color" 
                    value={customH3} 
                    onChange={(e) => handleCustomColor('customH3', e.target.value, setCustomH3)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">H4-H6 Color</label>
                  <input 
                    type="color" 
                    value={customH4} 
                    onChange={(e) => handleCustomColor('customH4', e.target.value, setCustomH4)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Paragraphs</label>
                  <input 
                    type="color" 
                    value={customP} 
                    onChange={(e) => handleCustomColor('customP', e.target.value, setCustomP)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Main Prime</label>
                  <input 
                    type="color" 
                    value={customPrimary} 
                    onChange={(e) => handleCustomColor('customPrimary', e.target.value, setCustomPrimary)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
               </div>
            </div>

            <p className="text-xs text-muted-foreground italic">
               Tip: This theme is injected globally into all components instantly.
            </p>
          </motion.div>
        )}

        {/* Background Effects */}
        <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 space-y-8">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold">Ambient Background</h3>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <div className={cn(
                "h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all overflow-hidden",
                bgImage ? "border-solid border-primary" : "border-muted-foreground/30 hover:border-primary/50"
              )}>
                {bgImage ? (
                  <>
                    <img src={bgImage} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <Button variant="secondary" size="sm" className="rounded-full bg-background/80 backdrop-blur" onClick={removeImage}>
                        <Trash2 size={14} className="mr-2" />
                        Remove Image
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                    />
                    <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
                    <p className="text-xs font-medium text-muted-foreground">Click to upload custom background</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="flex items-center gap-2"><Sliders size={12} /> Intensity</span>
                  <span>{bgOpacity}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={bgOpacity} 
                  onChange={(e) => handleOpacityChange(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="flex items-center gap-2"><Sparkles size={12} /> Ambient Blur</span>
                  <span>{bgBlur}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={bgBlur} 
                  onChange={(e) => handleBlurChange(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
