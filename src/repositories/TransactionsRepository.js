const TransactionRepository = module.exports;

const DB = require('../utils/DbConnection');
const { TRANSACTIONS } = require('../config/TableNames');

TransactionRepository.create = transaction => DB(TRANSACTIONS)
  .insert(transaction)
  .returning('*');

TransactionRepository.findTransactionByUserId = userId => DB(TRANSACTIONS)
  .where({ user_id: userId })
  .select('*')
  .orderBy('created_at', 'desc');

TransactionRepository.findTransactionByUserIdPagined = async (userId, perPage, currentPage) => {
  var pagination = {};
	var perPage = perPage || 10;
	var page = currentPage || 1;
	if (page < 1) page = 1;
	var offset = (page - 1) * perPage;

  return Promise.all([
    DB(TRANSACTIONS)
      .where({ user_id: userId })
      .clone()
      .count('* as count')
      .first(),
    DB(TRANSACTIONS)
      .where({ user_id: userId })
      .limit(perPage)
      .offset(offset)
  ])
  .then(([total, rows]) => {
    var count = total.count;
    var rows = rows;
    pagination.total = count;
    pagination.per_page = perPage;
    pagination.offset = offset;
    pagination.to = offset + rows.length;
    pagination.last_page = Math.ceil(count / perPage);
    pagination.current_page = page;
    pagination.from = offset;
    pagination.data = rows;
    return pagination;
  });
}
