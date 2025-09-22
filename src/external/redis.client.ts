import Redis from 'ioredis';
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD, // if you have auth
});

export default redis;
