import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, FileWarning, Loader2 } from 'lucide-react';
import { cn } from './ui';

export function UploadZone({ onFilesAdded, isAdding, addingProgress }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    if (isAdding) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    if (isAdding) return;
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(e.target.files);
    }
  };

  return (
    <div
      className={cn(
        "relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out p-12 text-center",
        isDragging 
          ? "border-primary bg-primary/5 scale-[0.99] shadow-inner" 
          : "border-border hover:border-primary/80 hover:bg-muted/30",
        isAdding && "pointer-events-none opacity-60"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !isAdding && fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        className="hidden"
        accept=".png,.jpg,.jpeg,.gif,.bmp,.tiff,.svg,.webp"
      />
      
      <div className="flex flex-col items-center gap-4">
        <div className={cn(
          "p-4 rounded-full bg-muted transition-colors duration-300",
          isDragging ? "bg-primary text-primary-foreground" : "group-hover:bg-primary/10 group-hover:text-primary",
          isAdding && "bg-primary text-primary-foreground"
        )}>
          {isAdding ? <Loader2 className="h-8 w-8 animate-spin" /> : <Upload className="h-8 w-8" />}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight">
            {isAdding 
              ? `Preparing ${addingProgress.current}/${addingProgress.total} files...` 
              : "Drop your images here"
            }
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            {isAdding 
              ? "Reading image headers and metadata." 
              : "Support for PNG, JPG, JPEG, GIF, BMP, TIFF, SVG, WEBP up to 10MB per file."
            }
          </p>
        </div>
        
        <div className="flex gap-2 text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-2">
          <div className="px-2 py-1 bg-muted rounded border lowercase">.png</div>
          <div className="px-2 py-1 bg-muted rounded border lowercase">.jpg</div>
          <div className="px-2 py-1 bg-muted rounded border lowercase">.webp</div>
          <div className="px-2 py-1 bg-muted rounded border lowercase">.svg</div>
        </div>
      </div>
      
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-border/60 rounded-tl group-hover:border-primary/40" />
      <div className="absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-border/60 rounded-tr group-hover:border-primary/40" />
      <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-border/60 rounded-bl group-hover:border-primary/40" />
      <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-border/60 rounded-br group-hover:border-primary/40" />
    </div>
  );
}
