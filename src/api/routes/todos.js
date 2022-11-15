const express = require('express')

const TodosHandler = require('../handlers/todos')

class TodosRouter {
    router
    todosHandler

    constructor() {
        this.router = express.Router()
        this.todosHandler = new TodosHandler()
        this.setupRoutes()
    }

    getRouter() {
        return this.router
    }

    setupRoutes() {
        this.router.patch('/todos/:id', this.todosHandler.patchTodo)
        this.router.get('/todos/:id', this.todosHandler.getTodos)
        this.router.post('/todos', this.todosHandler.createTodo)
        this.router.delete('/todos/:id', this.todosHandler.deleteTodo)
    }
}

module.exports = TodosRouter