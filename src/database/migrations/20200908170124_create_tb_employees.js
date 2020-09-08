
exports.up = function (knex) {
  return knex.schema.createTable('tb_employees', table => {
    table.increments('user_id').primary();
    table.string('user_name').notNullable();
    table.date('user_born_date').notNullable();
    table.decimal('user_salary', 8, 2).notNullable();
    table.string('user_position').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tb_employees');
};
