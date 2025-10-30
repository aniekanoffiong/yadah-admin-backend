export function toSlug(input: string, maxLength = 0): string {
  if (!input) return '';

  // normalize to remove accents/diacritics, then remove combining marks
  let slug = input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    // replace ampersand with 'and'
    .replace(/&+/g, '-and-')
    // replace any non-alphanumeric character sequences with a single hyphen
    .replace(/[^a-z0-9]+/g, '-')
    // collapse multiple hyphens
    .replace(/-+/g, '-')
    // trim leading/trailing hyphens
    .replace(/^-|-$/g, '');

  if (maxLength > 0 && slug.length > maxLength) {
    slug = slug.slice(0, maxLength).replace(/-$/g, '');
  }

  return slug;
}

// Example:
// toSlug("SPECIAL COMMUNION & ANOINTING SERVICE || APOSTLE CHARLES UDUAK || 26/10/2025")
// => "special-communion-and-anointing-service-apostle-charles-uduak-26-10-2025"