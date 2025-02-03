import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Create a Redis client
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Export Redis client and utility functions
export const cache = {
  get: async (key) => await redis.get(key),
  set: async (key, value, mode, duration) => 
    await redis.set(key, value, mode, duration),
  del: async (key) => await redis.del(key),
};

export default redis;