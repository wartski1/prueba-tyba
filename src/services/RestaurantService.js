const RestaurantService = module.exports;

const log4j = require('../utils/Logger');
const RestaurantProvider = require('../provider/RestaurantProvider');
const TransactionRepository = require('../repositories/TransactionsRepository');

const defaultLogger = log4j.getLogger('RestaurantService');

RestaurantService.findByCity = async (city, user, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`Requesting restaurants info from city: ${city}`);
  const restaurantsByCity = await RestaurantProvider.getByCity(city);

  const transaction = {
    city,
    user_id: user.sub,
  };
  await TransactionRepository.create(transaction);

  return restaurantsByCity;
};
