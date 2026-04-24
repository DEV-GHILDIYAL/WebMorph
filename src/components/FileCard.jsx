import { Download, FileWarning, CheckCircle2, Loader2, X, FileImage } from 'lucide-react';
import { formatBytes } from '../lib/converter';
import { Badge, Button, cn } from './ui';
import { STATUS } from '../hooks/useFileQueue';
import { useEffect, useState } from 'react';

export function FileCard({ fileEntry, onRemove }) {
  const { id, name, size, status, progress, error, webpBlob, file } = fileEntry;
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    // Determine which source to use for preview (prefer converted WebP for accuracy)
    const source = webpBlob || file;
    if (!source) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(source);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file, webpBlob]);

  const handleDownload = () => {
    if (!webpBlob) return;
    const url = URL.createObjectURL(webpBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name.replace(/\.[^/.]+$/, "") + ".webp";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-4 transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        {/* Preview */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted border">
          {previewUrl ? (
            <img src={previewUrl} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FileImage className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          {status === STATUS.PROCESSING && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="truncate text-sm font-semibold pr-6">{name}</h4>
            <div className="flex items-center gap-2">
               {status === STATUS.COMPLETED && (
                <Badge variant="success" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Done
                </Badge>
              )}
              {status === STATUS.FAILED && (
                <Badge variant="destructive" className="gap-1">
                  <FileWarning className="h-3 w-3" />
                  Error
                </Badge>
              )}
              {status === STATUS.PROCESSING && (
                <Badge variant="secondary" className="animate-pulse">Converting...</Badge>
              )}
               <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onRemove(id)}
                className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatBytes(size)}</span>
            <span className="font-medium">
              {status === STATUS.WAITING && "Queued"}
              {status === STATUS.PROCESSING && `${progress}%`}
              {status === STATUS.COMPLETED && "WEBP"}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div 
              className={cn(
                "h-full transition-all duration-500 ease-out",
                status === STATUS.FAILED ? "bg-destructive" : "bg-primary",
                status === STATUS.COMPLETED ? "bg-emerald-500" : ""
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        {status === STATUS.COMPLETED && (
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleDownload}
            className="h-10 w-10 shrink-0 border-emerald-500/20 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950"
          >
            <Download className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-[10px] text-destructive font-medium bg-destructive/5 p-1 rounded">
          {error}
        </p>
      )}
    </div>
  );
}

