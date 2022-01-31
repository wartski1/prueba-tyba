const { TRANSACTIONS, USERS } = require('../src/config/TableNames');

module.exports.up = knex => 
  knex.schema.createTable(TRANSACTIONS, (table) => {
    table.bigIncrements('id').notNullable();
    table.integer('user_id').index().notNullable().references(`${USERS}.id`);
    table.string('city').notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable(TRANSACTIONS);
