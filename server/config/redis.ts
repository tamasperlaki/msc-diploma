import * as redis from 'redis';

const client = redis.createClient(process.env.REDIS_URL);

client.on('error', console.error.bind(console, 'Redis connection error: '));
client.once('connect', () => {
  console.log(`Redis connected`);
});

export default client;
