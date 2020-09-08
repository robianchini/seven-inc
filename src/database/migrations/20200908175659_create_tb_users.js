
exports.up = function (knex) {
  return knex.schema.createTable('tb_users', table => {
    table.increments('user_id').primary();
    table.string('user_name').notNullable();
    table.string('user_login').notNullable();
    table.string('user_password').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tb_users');
};
