const AuthenticateController = module.exports;

const log4j = require('../utils/Logger');
const LogUtils = require('../utils/LogUtils');
const Validator = require('../utils/Validator');
const LoginSchema = require('../validators/LoginSchema');
const AuthenticateService = require('../services/AuthenticateService');

AuthenticateController.login = async (req, res, next) => {
  const logName = 'AuthenticateController';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { body } = req;

  logger.info(`Starts AuthenticateController.login: ${JSON.stringify(body)}`);
  try {
    Validator(LoginSchema).validateRequest(body);
  } catch (error) {
    return next(error);
  }

  return AuthenticateService.login(body, { logger, logName })
    .then(response => res.send({ token: response }))
    .catch(error => next(error));
};

AuthenticateController.logout = async (req, res, next) => {
  const logName = 'AuthenticateController';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { user } = req;

  logger.info(`Starts AuthenticateController.logout: ${JSON.stringify(user)}`);
  
  return AuthenticateService.logout(user, { logger, logName })
    .then(() => res.status(204).send())
    .catch(error => next(error));
};
