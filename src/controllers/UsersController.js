const UserController = module.exports;

const log4j = require('../utils/Logger');
const LogUtils = require('../utils/LogUtils');
const Validator = require('../utils/Validator');
const UserSchema = require('../validators/UsersSchema');
const UserService = require('../services/UsersService');

UserController.create = async (req, res, next) => {
  const logName = 'UserController';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;

  logger.info(`Starts UserController.create: ${JSON.stringify(body)}`);
  try {
    Validator(UserSchema).validateRequest(body);
  } catch (error) {
    return next(error);
  }
  
  return UserService.create(body, { logger, logName })
    .then(response => res.send(response))
    .catch(error => next(error));
};
