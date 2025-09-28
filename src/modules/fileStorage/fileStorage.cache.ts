import redis from "../../external/redis.client";

export function setCache(key: string, url: string, expiresIn: number) {
  redis.set(key, url, 'EX', expiresIn);
}

export async function getCache(key: string): Promise<string | null> {
  return await redis.get(key);
}