export interface IsoDurationOptions {
  includeSeconds?: boolean; // default false, include seconds in human string
  clockFormat?: boolean;    // default false, return "H:MM" or "H:MM:SS" when true
}

/**
 * Convert an ISO 8601 duration (e.g. "PT3H14M56S") to a human readable string.
 *
 * Examples:
 *  isoDurationToHuman('PT3H14M56S') => "3h 14m"
 *  isoDurationToHuman('PT3H14M56S', { includeSeconds: true }) => "3h 14m 56s"
 *  isoDurationToHuman('PT3H14M56S', { clockFormat: true }) => "3:14:56"
 *  isoDurationToHuman('PT14M', { clockFormat: true }) => "0:14"
 */
export function isoDurationToHuman(duration: string, opts: IsoDurationOptions = {}): string {
  if (!duration || typeof duration !== 'string') return '';

  const { includeSeconds = false, clockFormat = false } = opts;

  // Match hours, minutes, seconds in ISO 8601 durations like "PT3H14M56S"
  const m = duration.match(/P(?:\d+Y)?(?:\d+M)?(?:\d+D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/i);

  if (!m) return duration;

  const hours = Number(m[1] ?? 0);
  const minutes = Number(m[2] ?? 0);
  const seconds = Number(m[3] ?? 0);

  if (clockFormat) {
    const hh = String(hours);
    const mm = String(minutes).padStart(2, '0');
    if (includeSeconds) {
      const ss = String(seconds).padStart(2, '0');
      return `${hh}:${mm}:${ss}`;
    }
    return `${hh}:${mm}`;
  }

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (includeSeconds && seconds > 0) parts.push(`${seconds}s`);

  // If nothing matched (e.g. "PT0S"), fall back to a sensible representation
  if (parts.length === 0) {
    if (seconds > 0) return `${seconds}s`;
    return '0m';
  }

  return parts.join(' ');
}