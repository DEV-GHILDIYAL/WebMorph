import { useState, useEffect } from 'react';
import { settingsStore } from '../lib/db';

export function BackgroundManager() {
  const [bgImage, setBgImage] = useState(null);
  const [blur, setBlur] = useState(parseInt(localStorage.getItem('bgBlur') || '20'));
  const [opacity, setOpacity] = useState(parseInt(localStorage.getItem('bgOpacity') || '40'));

  const update = async () => {
    const img = await settingsStore.get('backgroundImage');
    setBgImage(img);
    setBlur(parseInt(localStorage.getItem('bgBlur') || '20'));
    setOpacity(parseInt(localStorage.getItem('bgOpacity') || '40'));
  };

  useEffect(() => {
    update();
    window.addEventListener('storage-settings-updated', update);
    return () => window.removeEventListener('storage-settings-updated', update);
  }, []);

  if (!bgImage) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          filter: `blur(${blur}px)`,
          opacity: opacity / 100,
          transform: 'scale(1.1)' // Prevents white edges on blur
        }}
      />
      {/* Dark gradient overlay to ensure readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/60" />
    </div>
  );
}
