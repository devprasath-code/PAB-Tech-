/**
 * Normalizes a Google Drive File ID by removing any leading/trailing spaces,
 * newlines, tabs, and zero-width spaces.
 * It preserves exact casing and does NOT modify internal characters if they are valid.
 */
export function normalizeDriveId(id: string | null | undefined): string | null {
  if (!id) return null;
  // Remove spaces, newlines, tabs, and zero-width spaces
  let cleaned = id.replace(/[\s\n\t\u200B]+/g, '');
  
  // Extract ID if a full URL was provided
  const match = cleaned.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    cleaned = match[1];
  } else {
    const idMatch = cleaned.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      cleaned = idMatch[1];
    }
  }

  return cleaned || null;
}

/**
 * Validates a Google Drive File ID.
 * Must be > 20 characters and contain only alphanumeric, dash, and underscore.
 */
export function validateDriveId(id: string | null | undefined): boolean {
  if (!id) return false;
  if (id.length <= 20) return false;
  
  // Google Drive IDs typically contain a-z, A-Z, 0-9, -, _
  const driveIdRegex = /^[a-zA-Z0-9_-]+$/;
  return driveIdRegex.test(id);
}

/**
 * Builds a preview URL for a Google Drive file.
 */
export function buildDrivePreviewURL(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/**
 * Builds a view URL for a Google Drive file.
 */
export function buildDriveViewURL(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
}

/**
 * Builds a download URL for a Google Drive file.
 */
export function buildDriveDownloadURL(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}
