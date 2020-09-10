const express = require('express');
const routes = express.Router();

const EmployeesController = require('./controllers/EmployeesController');
const UsersController = require('./controllers/UsersController');
const LoginController = require('./controllers/LoginController');

routes.get('/employees', EmployeesController.index);
routes.get('/employees/:id', EmployeesController.show);
routes.post('/employees', EmployeesController.create);
routes.put('/employees/:id', EmployeesController.update);
routes.delete('/employees/:id', EmployeesController.delete);

routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

routes.post('/login', LoginController.auth);

module.exports = routes;

