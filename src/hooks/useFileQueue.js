import { useState, useCallback, useRef, useEffect } from 'react';
import { convertToWebP } from '../lib/converter';

export const STATUS = {
  WAITING: 'waiting',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export const useFileQueue = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [addingProgress, setAddingProgress] = useState({ current: 0, total: 0 });
  const isAdding = addingProgress.total > 0 && addingProgress.current < addingProgress.total;
  
  const filesRef = useRef([]);
  const processingLoopActive = useRef(false);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const addFiles = useCallback(async (newFiles) => {
    const fileList = Array.from(newFiles);
    setAddingProgress({ current: 0, total: fileList.length });
    const newFileEntries = [];
    
    for (let i = 0; i < fileList.length; i++) {
      newFileEntries.push({
        id: crypto.randomUUID(),
        file: fileList[i],
        name: fileList[i].name,
        size: fileList[i].size,
        status: STATUS.WAITING,
        progress: 0,
        webpBlob: null,
        error: null,
      });
      if (i % 5 === 0 || i === fileList.length - 1) {
        setAddingProgress({ current: i + 1, total: fileList.length });
        await new Promise(r => setTimeout(r, 10));
      }
    }

    setFiles((prev) => [...prev, ...newFileEntries]);
    setTimeout(() => setAddingProgress({ current: 0, total: 0 }), 500);
  }, []);

  const startConversion = useCallback(async () => {
    if (processingLoopActive.current) return;
    
    processingLoopActive.current = true;
    setIsProcessing(true);

    while (true) {
      const currentFiles = filesRef.current;
      const nextFile = currentFiles.find(f => f.status === STATUS.WAITING);
      
      if (!nextFile) break;

      setFiles(prev => prev.map(f => f.id === nextFile.id ? { ...f, status: STATUS.PROCESSING, progress: 10 } : f));
      
      try {
        const blob = await convertToWebP(nextFile.file, 0.95);
        setFiles(prev => prev.map(f => f.id === nextFile.id ? { 
          ...f, 
          status: STATUS.COMPLETED, 
          progress: 100, 
          webpBlob: blob,
          // Memory Optimization: Release the original file handle
          file: null 
        } : f));
      } catch (error) {
        setFiles(prev => prev.map(f => f.id === nextFile.id ? { ...f, status: STATUS.FAILED, progress: 100, error: error.message } : f));
      }
      
      await new Promise(r => setTimeout(r, 50));
    }

    setIsProcessing(false);
    processingLoopActive.current = false;
  }, []);

  const removeFile = useCallback((id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearQueue = useCallback(() => {
    setFiles([]);
    setIsProcessing(false);
    processingLoopActive.current = false;
  }, []);

  const clearCompleted = useCallback(() => {
    setFiles((prev) => prev.filter((f) => f.status !== STATUS.COMPLETED));
  }, []);

  const stats = {
    total: files.length,
    completed: files.filter((f) => f.status === STATUS.COMPLETED).length,
    failed: files.filter((f) => f.status === STATUS.FAILED).length,
    processing: files.filter((f) => f.status === STATUS.PROCESSING).length,
    totalOriginalSize: files.reduce((acc, f) => acc + (f.size || 0), 0),
    totalWebPSize: files.reduce((acc, f) => acc + (f.webpBlob?.size || 0), 0),
    overallProgress: files.length > 0 
      ? Math.round((files.reduce((acc, f) => acc + f.progress, 0) / (files.length * 100)) * 100)
      : 0,
    isHealthy: files.length < 150, // Arbitrary limit for "safe" browser memory
  };

  return {
    files,
    addFiles,
    removeFile,
    clearQueue,
    clearCompleted,
    startConversion,
    isProcessing,
    isAdding,
    addingProgress,
    stats,
  };
};
