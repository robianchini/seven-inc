
exports.up = function (knex) {
  return knex.schema.table('tb_employees', table => {
    table.renameColumn('user_id', 'emp_id');
    table.renameColumn('user_name', 'emp_name');
    table.renameColumn('user_born_date', 'emp_born_date');
    table.renameColumn('user_salary', 'emp_salary');
    table.renameColumn('user_position', 'emp_position');
  });

};

exports.down = function (knex) {
  return knex.schema.dropTable('tb_employees');
};
