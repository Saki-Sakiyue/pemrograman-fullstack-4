export const getFullImageUrl = (path: string | null | undefined): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;
};

export const isSvgImage = (url: string): boolean => {
  return url.toLowerCase().endsWith('.svg') || url.toLowerCase().includes('svg');
}