/**
 * YouTube URL parsing utilities
 */

/**
 * Extract YouTube video ID from various URL formats
 * @param url - YouTube URL in any format
 * @returns Video ID or null if not valid
 *
 * @example
 * extractYouTubeVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ") // "dQw4w9WgXcQ"
 * extractYouTubeVideoId("https://youtu.be/dQw4w9WgXcQ") // "dQw4w9WgXcQ"
 * extractYouTubeVideoId("https://example.com") // null
 */
export function extractYouTubeVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : null;
}

/**
 * Get standard YouTube watch URL from video ID
 * @param videoId - YouTube video ID
 * @returns Standard YouTube URL
 *
 * @example
 * getStandardYouTubeUrl("dQw4w9WgXcQ") // "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 */
export function getStandardYouTubeUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * Validate if a URL is a valid YouTube URL
 * @param url - URL to validate
 * @returns true if valid YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== null;
}

/**
 * Get YouTube thumbnail URL from video ID
 * @param videoId - YouTube video ID
 * @param quality - Thumbnail quality
 * @returns Thumbnail URL
 */
export function getYouTubeThumbnailUrl(
  videoId: string,
  quality: 'default' | 'medium' | 'high' | 'maxres' = 'high'
): string {
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    maxres: 'maxresdefault',
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}
