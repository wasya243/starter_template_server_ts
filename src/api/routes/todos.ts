const express = require('express');

const validate = require('../../middlewares/validation');
const TodosHandler = require('../handlers/todos');

class TodosRouter {
  constructor() {
    this.router = express.Router();
    this.todosHandler = new TodosHandler();
    this.setupRoutes();
  }

  getRouter() {
    return this.router;
  }

  setupRoutes() {
    this.router.patch('/todos/:id', validate('patchTodo', 'body'), this.todosHandler.patchTodo);
    this.router.get('/todos/:id', this.todosHandler.getTodos);
    this.router.post('/todos', validate('createTodo', 'body'), this.todosHandler.createTodo);
    this.router.delete('/todos/:id', this.todosHandler.deleteTodo);
  }
}

module.exports = TodosRouter;
