import redis from "../../../external/redis.client";
import dotenv from "dotenv";

dotenv.config();
const TOKEN_BLACKLIST_PREFIX = process.env.TOKEN_BLACKLIST_PREFIX || 'jwt:blacklist:';

/**
 * Add a token to the blacklist with TTL in seconds
 */
export async function revokeToken(token: string, expireInSeconds: number = Number(process.env.JWT_TOKEN_EXPIRATION)): Promise<void> {
  await redis.set(TOKEN_BLACKLIST_PREFIX + token, 'blacklisted', 'EX', expireInSeconds);
}

/**
 * Check if a given token is blacklisted
 */
export async function isTokenRevoked(token: string): Promise<boolean> {
  const result = await redis.get(TOKEN_BLACKLIST_PREFIX + token);
  return result === 'blacklisted';
}
