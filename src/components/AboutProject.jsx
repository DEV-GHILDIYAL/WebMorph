import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, Lock, Info, BookOpen } from 'lucide-react';

export function AboutProject() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 pb-24"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold tracking-tight">Documentation & About</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to know about WebMorph's architecture, privacy standards, and conversion engine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Cpu className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold">The Conversion Engine</h3>
          <p className="text-muted-foreground">
            WebMorph uses the native <strong>Browser Canvas API</strong> to perform high-fidelity image encoding. When an image is uploaded, it is drawn onto a zero-latency offscreen buffer and then exported using <code>canvas.toBlob()</code> with a quality factor of 0.95.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Original dimensions are strictly preserved.</li>
            <li>No external servers or APIs are involved.</li>
            <li>Sequential processing prevents browser thread locking.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold">Privacy & Security</h3>
          <p className="text-muted-foreground">
            As an internal tool, security is paramount. WebMorph operates on a <strong>Local-First</strong> principle.
          </p>
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm">
            <strong>Security Fact:</strong> Your images are never uploaded to any server. All processing happens within your browser's persistent memory and is cleared as soon as the tab is closed or you hit "Clear All".
          </div>
        </section>
      </div>

      <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Info className="h-5 w-5" />
          Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h4 className="font-semibold">Why WebP?</h4>
            <p className="text-sm text-muted-foreground">WebP images are significantly smaller than PNG/JPG while maintaining superior quality, helping our internal sites load much faster.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Max File Size?</h4>
            <p className="text-sm text-muted-foreground">We support images up to 10MB. For larger images, the browser's memory management might throttle performance.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Animated GIF Support?</h4>
            <p className="text-sm text-muted-foreground">Currently, WebMorph captures the first frame of a GIF to create a high-quality static WebP.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Bulk ZIP Export?</h4>
            <p className="text-sm text-muted-foreground">We use JSZip to bundle all your converted files into one ZIP locally, so you don't have to download them one by one.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
