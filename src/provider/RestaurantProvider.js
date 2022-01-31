const RestaurantProvider = module.exports;

const log4j = require('../utils/Logger');
const { default: axios } = require('axios');
const { NotFoundError } = require('../utils/ErrorHandler');

const defaultLogger = log4j.getLogger('RestaurantProvider');
const BASE_URL = 'https://61f71db32e1d7e0017fd7009.mockapi.io/api/tyba';

RestaurantProvider.getByCity = async (city, options = {}) => {
  const { logger = defaultLogger } = options;
  const url = `${BASE_URL}/restaurants/${city}`;

  logger.info(`Get restaurants from provider: ${JSON.stringify(url)}`);
  const res = await axios.get(url)
    .then(res => res.data)
    .catch(() => {
      throw new NotFoundError('City not exist');
    });

  return res;
};
