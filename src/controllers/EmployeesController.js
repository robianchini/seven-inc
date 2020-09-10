
const knex = require('../database/connection');

module.exports = {

  async index(req, res) {
    const employeesList = await knex('tb_employees').orderBy('emp_name', 'asc');
    res.json({ employeesList });
  },

  async show(req, res) {
    const { id } = req.params;
    const empDetail = await knex('tb_employees').where('emp_id', id).first();

    if (!empDetail) {
      res.json({ error: 'ID não encontrado.' });
    } else {
      res.json(empDetail)
    }
  },

  async create(req, res) {
    const { emp_name, emp_born_date, emp_salary, emp_position } = req.body;

    const response = await knex('tb_employees').insert({
      emp_name, emp_born_date, emp_salary, emp_position
    });

    // res.json({ success: 'Cadastrado com sucesso!' });
    return res.status(200).send({ success: 'Cadastrado com sucesso.' });
  },

  async update(req, res) {
    const { id } = req.params;
    const { emp_name, emp_born_date, emp_salary, emp_position } = req.body;

    const hasEmp = await knex('tb_employees').where('emp_id', id).first();

    if (hasEmp) {
      const updated = await knex('tb_employees')
        .update({ emp_name, emp_born_date, emp_salary, emp_position })
        .where({ emp_id: id });
      if (updated) {
        res.json({ success: 'Alterado com sucesso.' });
      }
    } else {
      res.json({ error: 'Este ID não existe.' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    const hasEmp = await knex('tb_employees').where('emp_id', id).first();
    if (hasEmp) {
      await knex('tb_employees').del().where('emp_id', id);
      res.json({ success: 'Excluído com sucesso.' });
    } else {
      res.json({ error: 'Este ID não existe.' });
    }
  }
}