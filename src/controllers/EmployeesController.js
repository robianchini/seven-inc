
const knex = require('../database/connection');

module.exports = {

  async index(req, res) {
    const employeesList = await knex('tb_employees');
    res.json({ employessList });
  },

  async show(req, res) {
    const { id } = req.params;
    const userDetail = await knex('tb_employees').where('emp_id', id).first();

    if (!userDetail) {
      res.json({ error: 'Usuário não encontrado.' });
    } else {
      res.json(userDetail)
    }
  },

  async create(req, res) {
    const { emp_name, emp_born_date, emp_salary, emp_position } = req.body;

    const response = await knex('tb_employees').insert({
      emp_name, emp_born_date, emp_salary, emp_position
    });

    res.json({ success: 'Usuário cadastrado com sucesso!' });
  },

  async update(req, res) {
    const { id } = req.params;
    const { emp_name, emp_born_date, emp_salary, emp_position } = req.body;

    const hasUser = await knex('tb_employees').where('emp_id', id);

    if (hasUser) {
      const updated = await knex('tb_employees')
        .update({ emp_name, emp_born_date, emp_salary, emp_position })
        .where({ emp_id: id });
      if (updated) {
        res.json({ success: 'Usuário alterado com sucesso.' });
      }
    } else {
      res.json({ error: 'Este ID de usuário não existe.' });
    }
  },

  async delete(req, res) {
    res.json({ message: 'Delete User!' });
  }

}