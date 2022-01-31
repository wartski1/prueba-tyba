const knex = require('knex');
const config = require('../config/DatabaseConfig');

const DB = knex(config);

module.exports = DB;
