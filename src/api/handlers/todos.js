const {Todo} = require('../../db/models/todo')

class Todos {
    constructor() {
        this.createTodo = this.createTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.getTodos = this.getTodos.bind(this)
        this.patchTodo = this.patchTodo.bind(this)
    }

    async createTodo(req, res, next) {
        try {
            const {text, user_id, due_date} = req.body

            const todoDoc = new Todo({
                text,
                user_id,
                due_date
            })

            await todoDoc.save()

            res.send('saved')
        } catch (err) {
            next(err)
        }
    }

    async deleteTodo(req, res, next) {
        try {
            const id = req.params.id

            await Todo.deleteOne({_id: id})

            res.send('deleted')
        } catch (err) {
            next(err)
        }
    }

    async patchTodo(req, res, next) {
        try {
            const id = req.params.id
            const {is_completed} = req.body

            await Todo.updateOne({_id: id}, {is_completed})

            res.send('updated')
        } catch (err) {
            next(err)
        }
    }

    async getTodos(req, res, next) {
        try {
            const userId = req.params.id

            const todos = await Todo.find({user_id: userId})

            res.send(todos)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Todos