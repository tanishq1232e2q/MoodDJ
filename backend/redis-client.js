// backend/redis-client.js  ←  FINAL UPTASH-WINNING VERSION
const Redis = require('ioredis');

if (!process.env.REDIS_URL) {
  console.error('REDIS_URL missing!');
  process.exit(1);
}

// THIS IS THE EXACT CONFIG UPTASH RECOMMENDS
const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,     // ← CRITICAL: don't fail on cold start
  connectTimeout: 50000,
  lazyConnect: true,
  retryStrategy: (times) => Math.min(times * 500, 5000),
  reconnectOnError: () => true,
  enableOfflineQueue: true,        // ← THIS SAVES YOU
  commandTimeout: 10000,
});

redis.on('connect', () => console.log('Redis (Upstash) connected'));
redis.on('ready', () => console.log('Redis ready'));
redis.on('error', (err) => {
  if (err.message.includes('Connection is closed')) return; // normal
  if (err.message.includes('MaxRetriesPerRequestError')) return; // normal
  console.error('Redis Unexpected Error:', err.message);
});
redis.on('close', () => console.log('Redis connection closed (normal with Upstash)'));

module.exports = redis;