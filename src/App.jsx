import { useState } from 'react';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { FileCard } from './components/FileCard';
import { BatchActions } from './components/BatchActions';
import { DeveloperProfile } from './components/DeveloperProfile';
import { AboutProject } from './components/AboutProject';
import { useFileQueue } from './hooks/useFileQueue';
import { AnimatePresence, motion } from 'framer-motion';
import { Zap, ShieldCheck, Sparkles } from 'lucide-react';
import JSZip from 'jszip';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const { files, addFiles, removeFile, clearQueue, clearCompleted, startConversion, isProcessing, isAdding, addingProgress, stats } = useFileQueue();

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const completedFiles = files.filter(f => f.webpBlob);
    
    if (completedFiles.length === 0) return;

    completedFiles.forEach(f => {
      const fileName = f.name.replace(/\.[^/.]+$/, "") + ".webp";
      zip.file(fileName, f.webpBlob);
    });

    // Notify user of generation (can be heavy)
    const content = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 } 
    });

    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `webmorph-batch-${new Date().getTime()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Immediate Cleanup
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isHealthy={stats.isHealthy} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-12 text-center space-y-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider"
                >
                  <ShieldCheck className="h-3 w-3" />
                  Industrial Stability Active
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-extrabold tracking-tight"
                >
                  Transform your images <br />
                  <span className="text-primary">without the crash.</span>
                </motion.h2>

                {!stats.isHealthy && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 text-sm max-w-md mx-auto"
                  >
                    <strong>High Load Warning:</strong> Large queue detected. For maximum stability, consider clearing some files or converting in smaller batches.
                  </motion.div>
                )}
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-muted-foreground text-lg max-w-xl mx-auto"
                >
                  Optimized for 20-30 concurrent users. No servers, no data leakage, just high-performance conversion.
                </motion.p>
              </div>

              <section className="space-y-8">
                <UploadZone 
                  onFilesAdded={addFiles} 
                  isAdding={isAdding} 
                  addingProgress={addingProgress} 
                />

                {files.length > 0 && (
                  <div className="space-y-4 mb-32">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold tracking-tight">Conversion Queue</h3>
                      <span className="text-sm text-muted-foreground">{files.length} items</span>
                    </div>
                    
                    <div className="grid gap-3">
                      <AnimatePresence initial={false}>
                        {files.map((fileEntry) => (
                          <motion.div
                            key={fileEntry.id}
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                          >
                            <FileCard 
                              fileEntry={fileEntry} 
                              onRemove={removeFile} 
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </section>

              {files.length === 0 && (
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FeatureCard 
                    icon={<Zap className="h-6 w-6 text-primary" />}
                    title="Hyper-Fast"
                    description="Native browser conversion handles bulk images in seconds."
                  />
                  <FeatureCard 
                    icon={<ShieldCheck className="h-6 w-6 text-primary" />}
                    title="Secure & Private"
                    description="All processing happens locally. Your files never leave your device."
                  />
                  <FeatureCard 
                    icon={<Sparkles className="h-6 w-6 text-primary" />}
                    title="Premium Quality"
                    description="High-fidelity output at 95% quality with original dimensions."
                  />
                </div>
              )}
            </motion.div>
          )}

          {currentView === 'dev' && <DeveloperProfile key="dev" />}
          {currentView === 'docs' && <AboutProject key="docs" />}
        </AnimatePresence>
      </main>

      {currentView === 'home' && (
        <BatchActions 
          stats={stats}
          onStart={startConversion}
          onClear={clearQueue}
          onClearCompleted={clearCompleted}
          onDownloadAll={handleDownloadAll}
          isProcessing={isProcessing}
          isAdding={isAdding}
          addingProgress={addingProgress}
          hasFiles={files.length > 0}
        />
      )}

      <footer className="py-8 border-t bg-muted/30 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Built for Internal Team Usage • WebMorph &copy; 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50 border border-border/50 space-y-3">
      <div className="p-3 rounded-xl bg-background shadow-sm border border-border/10">
        {icon}
      </div>
      <h4 className="font-bold text-base">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default App;
