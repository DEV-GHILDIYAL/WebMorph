import { Play, Download, Trash2, CheckCircle2, Loader2, Eraser } from 'lucide-react';
import { Button, cn } from './ui';
import JSZip from 'jszip';

export function BatchActions({ stats, onStart, onClear, onClearCompleted, onDownloadAll, isProcessing, isAdding, addingProgress, hasFiles }) {
  const { total, completed, overallProgress } = stats;

  const handleDownloadAll = async () => {
    onDownloadAll();
  };

  if (!hasFiles && !isAdding) return null;

  const showAdding = isAdding && addingProgress.total > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      <div className="container mx-auto px-6 h-24 lg:h-20 max-w-5xl">
        <div className="flex h-full items-center justify-between gap-8">
          
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2">
              <span className="flex items-center gap-2 text-foreground">
                {isProcessing || showAdding ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                ) : completed === total && total > 0 ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                ) : null}
                {showAdding 
                  ? `Preparing (${addingProgress.current}/${addingProgress.total})` 
                  : completed === total && total > 0
                    ? 'All Converted' 
                    : isProcessing 
                      ? `Converting (${completed + 1}/${total})` 
                      : 'System Ready'
                }
              </span>
              <span className="text-muted-foreground">
                {showAdding 
                  ? `${Math.round((addingProgress.current / addingProgress.total) * 100)}%` 
                  : `${overallProgress}%`
                }
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50 border border-border/10">
              <div 
                className={cn(
                  "h-full transition-all duration-500 ease-out",
                  showAdding ? "bg-primary animate-pulse" : "bg-primary"
                )}
                style={{ 
                  width: `${showAdding 
                    ? (addingProgress.current / addingProgress.total) * 100 
                    : overallProgress}%` 
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="mr-auto sm:hidden flex flex-col">
               <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-left">
                 {showAdding ? `ADD: ${addingProgress.current}/${addingProgress.total}` : `STAT: ${completed}/${total}`}
               </span>
               <span className="text-[10px] text-primary font-bold">
                 {showAdding 
                    ? `${Math.round((addingProgress.current / addingProgress.total) * 100)}%` 
                    : `${overallProgress}%`
                 }
               </span>
            </div>

            {completed > 0 && !isProcessing && !isAdding && (
               <Button 
                variant="ghost" 
                onClick={onClearCompleted} 
                className="h-10 px-3 gap-2 text-muted-foreground hover:text-foreground hidden md:flex"
              >
                <Eraser className="h-4 w-4" />
                <span>Clear Finished</span>
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={onClear} 
              disabled={isProcessing || isAdding}
              className="h-10 px-4 gap-2 border-muted-foreground/20"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden xs:inline">Clear All</span>
            </Button>
            
            {(completed < total || showAdding) ? (
               <Button 
                onClick={onStart} 
                disabled={isProcessing || isAdding || total === 0}
                className="h-10 px-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 font-bold disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
              >
                {isProcessing || isAdding ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 fill-current" />
                )}
                {isAdding ? `Loading...` : isProcessing ? 'Converting' : 'Convert All'}
              </Button>
            ) : null}

            {completed > 0 && !isAdding && (
              <Button 
                variant="primary"
                onClick={handleDownloadAll}
                disabled={isProcessing}
                className="h-10 px-6 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 font-bold"
              >
                <Download className="h-4 w-4" />
                <span className="hidden xs:inline">Download ZIP</span>
                <span className="xs:hidden">ZIP</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
