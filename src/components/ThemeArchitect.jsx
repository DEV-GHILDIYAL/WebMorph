import { useEffect } from 'react';

export function ThemeArchitect() {
  const update = () => {
    const theme = localStorage.getItem('theme');
    const root = document.documentElement;
    
    if (theme === 'custom') {
      const primary = localStorage.getItem('customPrimary') || '#408EC6';
      const bg = localStorage.getItem('customBg') || '#0f172a';
      const h1 = localStorage.getItem('customH1') || '#f8fafc';
      const h2 = localStorage.getItem('customH2') || '#f1f5f9';
      const h3 = localStorage.getItem('customH3') || '#e2e8f0';
      const h4 = localStorage.getItem('customH4') || '#cbd5e1';
      const p = localStorage.getItem('customP') || '#94a3b8';
      const link = localStorage.getItem('customLink') || '#408EC6';
      const border = localStorage.getItem('customBorder') || '#334155';
      const isGradient = localStorage.getItem('isGradient') === 'true';

      // Convert Hex to HSL
      const hexToHsl = (hex) => {
        if (!hex) return '0 0% 100%';
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
          h = s = 0;
        } else {
          let d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
        return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
      };

      root.style.setProperty('--primary', hexToHsl(primary));
      root.style.setProperty('--background', hexToHsl(bg));
      root.style.setProperty('--card', hexToHsl(bg));
      root.style.setProperty('--h1', hexToHsl(h1));
      root.style.setProperty('--h2', hexToHsl(h2));
      root.style.setProperty('--h3', hexToHsl(h3));
      root.style.setProperty('--h4', hexToHsl(h4));
      root.style.setProperty('--p', hexToHsl(p));
      root.style.setProperty('--link', hexToHsl(link));
      root.style.setProperty('--border', hexToHsl(border));
      root.style.setProperty('--foreground', hexToHsl(p)); // Fallback
      
      if (isGradient) {
        root.style.setProperty('--background-gradient', `linear-gradient(135deg, ${bg}, ${primary})`);
      } else {
        root.style.removeProperty('--background-gradient');
      }
      
      root.classList.add('theme-custom');
      root.classList.add('dark');
    } else {
      ['primary', 'background', 'card', 'h1', 'h2', 'h3', 'h4', 'p', 'link', 'border', 'foreground', 'background-gradient'].forEach(v => {
        root.style.removeProperty(`--${v}`);
      });
      root.classList.remove('theme-custom');
    }
  };

  useEffect(() => {
    update();
    window.addEventListener('storage-settings-updated', update);
    return () => window.removeEventListener('storage-settings-updated', update);
  }, []);

  return null;
}
