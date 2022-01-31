const TransactionService = module.exports;

const log4j = require('../utils/Logger');
const TransactionRepository = require('../repositories/TransactionsRepository');

const defaultLogger = log4j.getLogger('TransactionService');

TransactionService.findAllByUserId = async (user, limit, page, options = {}) => {
  const { logger = defaultLogger } = options;
  const { sub } = user;
  logger.info(`Get transactions by userId: ${sub}`);
  
  return TransactionRepository.findTransactionByUserIdPagined(sub, limit, page);
};
