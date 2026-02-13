/**
 * Local deterministic inference utilities for gallery items
 * Uses filename parsing and keyword matching to generate names and categories
 */

// Material/object keywords for category inference
const CATEGORY_KEYWORDS = {
  'Bricks & Cement': ['brick', 'cement', 'concrete', 'mortar', 'block'],
  'Steel & Rods': ['steel', 'rod', 'rebar', 'tmt', 'iron', 'metal', 'bar'],
  'Plumbing': ['pipe', 'pvc', 'plumbing', 'tank', 'water', 'drain', 'fitting'],
  'Fasteners': ['nail', 'screw', 'bolt', 'fastener', 'rivet', 'anchor'],
  'Paints': ['paint', 'primer', 'coating', 'emulsion', 'enamel', 'varnish'],
  'Bathroom': ['tap', 'faucet', 'basin', 'shower', 'toilet', 'bathroom', 'sink'],
};

/**
 * Extract meaningful tokens from filename
 */
function parseFilename(filename: string): string[] {
  // Remove extension and path
  const name = filename.split('/').pop()?.split('.')[0] || '';
  
  // Split by common separators and filter out dimension info
  return name
    .split(/[-_\s]+/)
    .filter(token => 
      token.length > 2 && 
      !token.startsWith('dim') && 
      !token.match(/^\d+x\d+$/) &&
      !token.match(/^\d+$/)
    )
    .map(token => token.toLowerCase());
}

/**
 * Generate a human-readable product name from filename tokens
 */
export function generateProductName(imagePath: string): string {
  const tokens = parseFilename(imagePath);
  
  if (tokens.length === 0) {
    return 'Construction Material';
  }
  
  // Capitalize each token and join with spaces
  const name = tokens
    .map(token => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
  
  return name;
}

/**
 * Infer category from both filename tokens and material keywords
 */
export function inferCategory(imagePath: string): string {
  const tokens = parseFilename(imagePath);
  const searchText = tokens.join(' ').toLowerCase();
  
  // Score each category based on keyword matches
  const scores: Record<string, number> = {};
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    scores[category] = 0;
    
    for (const keyword of keywords) {
      // Check if keyword appears in any token
      if (searchText.includes(keyword)) {
        scores[category] += 1;
      }
      
      // Bonus for exact token match
      if (tokens.includes(keyword)) {
        scores[category] += 2;
      }
    }
  }
  
  // Find category with highest score
  let bestCategory = 'Other';
  let bestScore = 0;
  
  for (const [category, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }
  
  // Return 'Other' if confidence is too low
  return bestScore > 0 ? bestCategory : 'Other';
}

/**
 * Generate full gallery item metadata from image path
 */
export function generateGalleryMetadata(imagePath: string) {
  return {
    name: generateProductName(imagePath),
    category: inferCategory(imagePath),
  };
}
