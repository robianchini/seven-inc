const bcrypt = require('bcryptjs');
const knex = require('../database/connection');

module.exports = {

  async index(req, res) {
    const usersList = await knex('tb_users');
    usersList.map(user => user.user_password = null)
    res.json({ usersList });
  },

  async show(req, res) {
    const { id } = req.params;
    const userDetail = await knex('tb_users').where('user_id', id).first();

    if (!userDetail) {
      res.json({ error: 'Usuário não encontrado.' });
    } else {
      userDetail.user_password = null
      res.json(userDetail)
    }
  },

  async create(req, res) {

    const { user_name, user_login, user_password } = req.body;
    const hasUser = await knex('tb_users').where('user_login', user_login).first();
    const hashedPassword = await bcrypt.hashSync(user_password, 10);

    if (hasUser) {
      // res.json({ error: 'Este login já está cadastrado.' });
      return res.status(400).send({ error: 'Este login já está cadastrado.!' });
    } else {
      const response = await knex('tb_users').insert({
        user_name, user_login, user_password: hashedPassword
      });

      // res.json({ success: 'Usuário cadastrado com sucesso.' });
      return res.status(200).send({ success: 'Usuário cadastrado com sucesso.' });

    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { user_name, user_login } = req.body;

    const hasUser = await knex('tb_users').where('user_id', id).first();
    const hasLogin = await knex('tb_users').where('user_login', user_login).first();

    if (hasUser) {
      if (hasLogin) {
        res.json({ error: 'Este login usuário já existe.' });
      } else {
        const updated = await knex('tb_users')
          .update({ user_name, user_login })
          .where({ user_id: id });
        if (updated) {
          res.json({ success: 'Usuário alterado com sucesso.' });
        }
      }
    } else {
      res.json({ error: 'Este ID de usuário não existe.' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    const hasUser = await knex('tb_users').where('user_id', id).first();
    if (hasUser) {
      await knex('tb_users').del().where('user_id', id);
      res.json({ success: 'Usuário excluído.' });
    } else {
      res.json({ error: 'Este ID de usuário não existe.' });
    }
  }
}