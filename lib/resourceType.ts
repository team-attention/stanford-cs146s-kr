export function detectActualType(url: string, declaredType: string): string {
  const normalizedUrl = url.toLowerCase();

  if (normalizedUrl.includes('youtube.com') || normalizedUrl.includes('youtu.be')) {
    return 'youtube';
  }
  if (normalizedUrl.includes('docs.google.com/presentation')) {
    return 'slides';
  }
  if (normalizedUrl.includes('github.com')) {
    return 'github';
  }
  if (normalizedUrl.endsWith('.pdf') || normalizedUrl.includes('/pdf/')) {
    return 'pdf';
  }

  return declaredType;
}
