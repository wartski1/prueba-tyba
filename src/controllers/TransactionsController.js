const TransactionController = module.exports;

const log4j = require('../utils/Logger');
const LogUtils = require('../utils/LogUtils');
const TransactionService = require('../services/TransactionsService');

TransactionController.findTransactions = async (req, res, next) => {
  const logName = 'TransactionController';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const { user, query: { limit, page } } = req;

  logger.info(`Starts TransactionController.find: ${JSON.stringify(user)}`);
  
  return TransactionService.findAllByUserId(user, limit, page, { logger, logName })
    .then(response => res.send(response))
    .catch(error => next(error));
};
