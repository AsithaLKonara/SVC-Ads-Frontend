/**
 * Utility functions for handling images and videos in media galleries and ads
 */

export function isVideoUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.startsWith('data:video/')) return true;
  return /\.(mp4|webm|ogg|mov|m4v|avi|mkv)([?#].*)?$/i.test(trimmed);
}

export function getFirstImageThumbnail(mediaList?: string[], fallback = '/images/placeholder.jpg'): string {
  if (!mediaList || mediaList.length === 0) return fallback;
  const image = mediaList.find(item => !isVideoUrl(item));
  return image || fallback;
}

