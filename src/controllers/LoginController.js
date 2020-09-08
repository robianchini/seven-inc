const knex = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth.json');

module.exports = {

  async auth(req, res) {
    const { user_login, user_password } = req.body;
    const user = await knex('tb_users').where({ user_login: user_login }).first();

    if (!user)
      return res.status(400).send({ error: 'Usuário não encontrado!' });

    if (!await bcrypt.compare(user_password, user.user_password))
      return res.status(400).send({ error: 'Senha incorreta!' })

    const userId = user.user_id;
    const userName = user.user_name;
    const userLogin = user.user_login;

    user.user_password = null

    const token = jwt.sign({ userId, userName, userLogin }, authConfig.secret, {
      expiresIn: 86400,
    });

    res.send({ user, token });

  }

}