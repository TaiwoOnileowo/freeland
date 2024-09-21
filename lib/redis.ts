import { createClient } from "redis";

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-18511.c275.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 18511,
  },
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const connectToRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('Connected to Redis');
  }
};

export { redisClient, connectToRedis };
