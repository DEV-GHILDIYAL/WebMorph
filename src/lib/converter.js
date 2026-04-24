/**
 * Converts an image file handle to a WebP blob using high-performance Browser APIs.
 * Uses createImageBitmap for zero-copy decoding to prevent memory crashes on bulk uploads.
 * 
 * @param {File} file - The original image file
 * @param {number} quality - The quality of the WebP output (0 to 1)
 * @returns {Promise<Blob>} - The converted WebP blob
 */
export const convertToWebP = async (file, quality = 0.95) => {
  let bitmap = null;
  try {
    // createImageBitmap is significantly faster and more memory-efficient than FileReader + new Image()
    // because it decodes the image off-main-thread and avoids Base64 string overhead.
    bitmap = await createImageBitmap(file);
    
    // Use OffscreenCanvas if available for maximum performance, fallback to standard canvas
    const canvas = typeof OffscreenCanvas !== 'undefined' 
      ? new OffscreenCanvas(bitmap.width, bitmap.height)
      : document.createElement('canvas');

    if (!(canvas instanceof OffscreenCanvas)) {
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Draw the bitmap directly to the canvas
    ctx.drawImage(bitmap, 0, 0);

    // Convert to WebP blob
    const blob = await new Promise((resolve) => {
      if (canvas instanceof OffscreenCanvas) {
        canvas.convertToBlob({ type: 'image/webp', quality }).then(resolve);
      } else {
        canvas.toBlob(resolve, 'image/webp', quality);
      }
    });

    if (!blob) throw new Error('Canvas conversion failed');

    // EXPLICIT CLEANUP: Crucial for Preventing Crashes
    // 1. Close the bitmap immediately to free decoded memory
    bitmap.close();
    
    // 2. Shrink canvas to 1x1 to force browser to reclaim large buffer memory
    if (!(canvas instanceof OffscreenCanvas)) {
      canvas.width = 1;
      canvas.height = 1;
    }

    return blob;
  } catch (error) {
    if (bitmap) bitmap.close();
    console.error('WebMorph Conversion Error:', error);
    throw new Error(`Conversion failed: ${error.message}`);
  }
};

/**
 * Formats bytes to a human-readable string.
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
