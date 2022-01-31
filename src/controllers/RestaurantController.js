const RestaurantController = module.exports;

const log4j = require('../utils/Logger');
const LogUtils = require('../utils/LogUtils');
const RestaurantService = require('../services/RestaurantService');

RestaurantController.getRestaurants = async (req, res, next) => {
  const logName = 'RestaurantController';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { user, params: { city } } = req;

  logger.info(`Starts RestaurantController.getRestaurants: ${JSON.stringify(user)}`);
    
  return RestaurantService.findByCity(city, user, { logger, logName })
    .then(response => res.send(response))
    .catch(error => next(error));
};
