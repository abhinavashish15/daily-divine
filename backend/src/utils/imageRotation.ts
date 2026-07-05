import { Image } from '@prisma/client';

export const selectImageToSend = (images: Image[]): Image | null => {
  if (!images || images.length === 0) return null;

  // Algorithm: Least Used -> Oldest Last Sent -> Random Selection
  
  // Find the minimum usage count
  const minUsage = Math.min(...images.map(img => img.timesUsed));
  
  // Filter images that have the minimum usage count
  const leastUsedImages = images.filter(img => img.timesUsed === minUsage);

  // From those, sort by oldest 'lastSent' (null first)
  leastUsedImages.sort((a, b) => {
    if (!a.lastSent && b.lastSent) return -1;
    if (a.lastSent && !b.lastSent) return 1;
    if (!a.lastSent && !b.lastSent) return 0;
    return a.lastSent!.getTime() - b.lastSent!.getTime();
  });

  // Collect all images that share the exact same oldest time (or are all null)
  const oldestTime = leastUsedImages[0].lastSent?.getTime();
  const candidates = leastUsedImages.filter(img => img.lastSent?.getTime() === oldestTime);

  // Random selection among the candidates to avoid predictable loops
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
};
