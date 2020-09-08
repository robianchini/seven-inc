const express = require('express');
const EmployeesController = require('./controllers/EmployeesController');
const routes = express.Router();

routes.get('/employees', EmployeesController.index);
routes.get('/employees/:id', EmployeesController.show);
routes.post('/employees', EmployeesController.create);
routes.put('/employees/:id', EmployeesController.update);
routes.delete('/employees/:id', EmployeesController.delete);

module.exports = routes;

