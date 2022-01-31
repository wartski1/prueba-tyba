const RedisClient = module.exports;
const Ioredis = require('ioredis');
const log4j = require('../utils/Logger');
const redisConfig = require('../config/RedisConfig');

const Redis = new Ioredis(redisConfig);
const defaultLogger = log4j.getLogger('TokenService');

const SERVICE_NAME = 'prueba-tyba-ms';

function getKey(key) {
  return `${SERVICE_NAME}:${key}`;
}

RedisClient.save = (key, data, ttl = redisConfig.expirationTime, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`Saving with key = ${getKey(key)} on redis ${JSON.stringify(data)}`);

  return Redis.set(getKey(key), JSON.stringify(data), 'EX', ttl);
};

RedisClient.get = (key, options = {}) => {
  const { logger = defaultLogger } = options;

  logger.info(`Get from redis ${getKey(key)}`);

  return Redis.get(getKey(key)).then(resp => JSON.parse(resp));
};

RedisClient.delete = (key, options = {}) => {
  const { logger = defaultLogger } = options;

  logger.info(`Del from redis ${getKey(key)}`);

  return Redis.del(getKey(key));
};
