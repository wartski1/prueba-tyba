const AuthenticationRepository = module.exports;

const log4j = require('../utils/Logger');
const RedisClient = require('../utils/RedisClient');

const defaultLogger = log4j.getLogger('AuthenticationsRepository');

AuthenticationRepository.getToken = (userID, options = {}) => {
  const { logger = defaultLogger } = options;
  const key = `userID:${userID}`;

  try {
    return RedisClient.get(key);
  } catch (error) {
    logger.error(`Error trying to get token from userID:${userID} | ${JSON.stringify(error.message || error)}`);
  }
};

AuthenticationRepository.createToken = (userID, token, options = {}) => {
  if (!token) {
    return undefined;
  }
  const { logger = defaultLogger } = options;
  const key = `userID:${userID}`;

  try {
    return RedisClient.save(key, token);
  } catch (error) {
    logger.error(`Error trying to save token | ${JSON.stringify(error.message || error)}`);
  }
};

AuthenticationRepository.deleteToken = (userID, options = {}) => {
  const { logger = defaultLogger } = options;
  const key = `userID:${userID}`;

  try {
    return RedisClient.delete(key);
  } catch (error) {
    logger.error(`Error trying to delete token from userID:${userID} | ${JSON.stringify(error.message || error)}`);
  }
};
