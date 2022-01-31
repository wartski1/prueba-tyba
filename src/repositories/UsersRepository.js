const UserRepository = module.exports;

const DB = require('../utils/DbConnection');
const { USERS } = require('../config/TableNames');

UserRepository.create = user => DB(USERS)
  .insert(user)
  .returning('*');

UserRepository.findUserById = userId => DB(USERS)
  .where({ id: userId })
  .select('*')
  .first();

UserRepository.findUserByDocument = document => DB(USERS)
  .where({ document })
  .select('*')
  .first();
