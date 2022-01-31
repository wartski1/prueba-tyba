const Helpers = module.exports;

const Ioredis = require('ioredis');
const DB = require('../src/utils/DbConnection');
const redisConfig = require('../src/config/RedisConfig');
const { USERS, TRANSACTIONS } = require('../src/config/TableNames');

Helpers.db = DB;

Helpers.migrate = () => DB.migrate.latest();

Helpers.clear = async () => {
  await DB(TRANSACTIONS).del();
  await DB(USERS).del();
};

Helpers.clearCache = () => {
  redisConfig.host = 'localhost';
  const Redis = new Ioredis(redisConfig);

  return Redis.flushdb();
};

Helpers.clean = async () => {
  await DB.migrate.rollback();
  await this.migrate();
};
