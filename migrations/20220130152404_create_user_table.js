const { USERS } = require('../src/config/TableNames');

module.exports.up = knex => 
  knex.schema.createTable(USERS, (table) => {
    table.bigIncrements('id');
    table.string('name').notNullable();
    table.integer('document').notNullable()
      .unique({indexName:'user_unqiue_document', deferrable:'immediate'});
    table.string('password').notNullable();
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable(USERS);
