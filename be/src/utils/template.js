/**
 * Calculates the popularity score of a template based on its upvotes, bookmarks, and downloads.
 * The formula is: (upvotes * 3) + (bookmarks * 2) + (downloads * 1)
 * @param {number} upvotes - The number of upvotes the template has received.
 * @param {number} bookmarks - The number of bookmarks the template has received.
 * @param {number} downloads - The number of times the template has been downloaded.
 * @returns {number} The calculated popularity score.
 */
const calculatePopularityScore = (upvotes, bookmarks, downloads) => {
  return upvotes * 3 + bookmarks * 2 + downloads * 1;
};

/**
 * Generates a unique source identifier for a template based on its source and demo URL.
 * The identifier is a combination of the source hostname and the last part of the demo URL.
 * If the source or demo URL is missing, it falls back to a default value.
 * @param {string} source - The source URL of the template.
 * @param {string} demoUrl - The demo URL of the template.
 * @param {number} index - The index of the template in the list (used for fallback).
 * @returns {string} The generated source identifier.
 */
const generateSourceIdentifier = (source, demoUrl, index) => {
  const sourcePart = source
    ? source.startsWith('http')
      ? new URL(source).hostname
      : source
    : 'unknown-source';

  const sourceSlug = demoUrl ? demoUrl.split('/').filter(Boolean).pop() : `unknown-slug-${index}`;
  return `${sourcePart}-${sourceSlug}`;
};

module.exports = {
  calculatePopularityScore,
  generateSourceIdentifier,
};
