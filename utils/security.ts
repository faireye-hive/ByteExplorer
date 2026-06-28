import DOMPurify from 'dompurify';

/**
 * Sanitizes a URL string to prevent XSS attacks (e.g., javascript: protocols).
 * Returns an empty string if the URL is invalid or dangerous.
 */
export const sanitizeUrl = (url: string | undefined | null): string => {
  if (!url) return '';
  
  // Basic cleaning
  const trimmed = url.trim();
  
  // Use DOMPurify to clean the URL
  const clean = DOMPurify.sanitize(trimmed, { 
    RETURN_DOM: false, 
    RETURN_TRUSTED_TYPE: false 
  });

  // Explicitly check for dangerous protocols that DOMPurify might allow in certain contexts but we want to ban
  if (/^(javascript|vbscript|data):/i.test(clean)) {
    return '';
  }

  return clean;
};

/**
 * Sanitizes HTML content if we ever need to render raw HTML (e.g. Markdown preview).
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li', 'ol'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
};