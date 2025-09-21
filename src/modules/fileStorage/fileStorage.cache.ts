const cache = new Map<string, { url: string; expiresAt: number }>();

export function setCache(key: string, url: string, expiresIn: number) {
  cache.set(key, { url, expiresAt: Date.now() + expiresIn * 1000 });
}

export function getCache(key: string): string | null {
  const entry = cache.get(key);
  if (entry && entry.expiresAt > Date.now()) {
    return entry.url;
  }
  cache.delete(key);
  return null;
}