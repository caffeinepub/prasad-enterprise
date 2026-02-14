import { SITE_CONFIG } from '@/config/site';

/**
 * Build an absolute URL from the canonical site URL and a path
 * @param path - The path to append to the site URL (with or without leading slash)
 * @returns The complete absolute URL
 */
export function absoluteUrl(path: string = ''): string {
  const baseUrl = SITE_CONFIG.url.endsWith('/') 
    ? SITE_CONFIG.url.slice(0, -1) 
    : SITE_CONFIG.url;
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${cleanPath}`;
}
