import express from 'express';

const validate = require('../../middlewares/validation');
import {Todos as TodosHandler} from '../handlers/todos';

export class TodosRouter {
    private readonly router: express.Router;
    private readonly todosHandler: TodosHandler;
    constructor() {
        this.router = express.Router();
        this.todosHandler = new TodosHandler();
        this.setupRoutes();
    }

    getRouter(): express.Router {
        return this.router;
    }

    setupRoutes(): void {
        this.router.patch('/todos/:id', validate('patchTodo', 'body'), this.todosHandler.patchTodo);
        this.router.get('/todos/:id', this.todosHandler.getTodos);
        this.router.post('/todos', validate('createTodo', 'body'), this.todosHandler.createTodo);
        this.router.delete('/todos/:id', this.todosHandler.deleteTodo);
    }
}
