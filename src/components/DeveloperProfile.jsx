import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Code2, Globe, Sparkles } from 'lucide-react';
import { Button } from './ui';

export function DeveloperProfile() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 pb-24"
    >
      <div className="relative rounded-3xl overflow-hidden bg-primary/5 border border-primary/10 p-8 md:p-12 text-center">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Code2 size={120} />
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="h-32 w-32 rounded-full border-4 border-background shadow-xl mb-6 overflow-hidden bg-muted flex items-center justify-center">
             <span className="text-4xl font-bold text-primary">DEV</span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight mb-2">Build with Precision</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Created by a developer passionate about building high-performance, privacy-focused internal utilities for modern teams.
          </p>
          
          <div className="flex gap-4">
            <a href="https://github.com/DEV-GHILDIYAL" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300">
                 <Github className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/dev-ghildiyal/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300">
                 <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a href="mailto:ghildiyaldev1325@gmail.com">
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300">
                 <Mail className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-muted/30 border border-border/50">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            My Philosophy
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            I believe that enterprise tools should be as beautiful and intuitive as consumer apps. Performance and privacy are not features, they are the foundation. Every tool I build is designed to run 100% locally to protect team data.
          </p>
        </div>
        
        <div className="p-8 rounded-2xl bg-muted/30 border border-border/50">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Expertise
          </h3>
          <div className="flex flex-wrap gap-2">
             {["React & Vite", "Modern CSS", "Browser APIs", "System Architecture", "UI/UX Design", "WASM Optimization"].map(skill => (
               <span key={skill} className="px-3 py-1 rounded-full bg-background border text-xs font-semibold text-primary">
                 {skill}
               </span>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
