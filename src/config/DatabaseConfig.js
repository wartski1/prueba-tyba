const MAX_CONNECTION_POOL_SIZE = 5;

const { env: { DB_CONNECTION } } = process;

module.exports = {
  client: 'pg',
  connection: DB_CONNECTION,
  pool: { min: 1, max: MAX_CONNECTION_POOL_SIZE },
  acquireConnectionTimeout: 5000,
};
