require('dotenv').config();
const config = require('./src/config/DatabaseConfig');

module.exports = {
  ...config,
};
