const express = require('express')
const bodyParser = require('body-parser')
const {STATUS_CODES} = require('http')

const Todos = require('./routes/todos')

class API {
    router
    todos

    constructor() {
        this.router = express.Router()
        this.todos = new Todos()
        this.setUpAPI()
    }

    getAPI() {
        return this.router
    }

    _logRequest(req, res, next) {
        const requestData = {
            url: req.url,
            date: new Date().toISOString(),
            method: req.method
        }

        console.log('Request made:', {
            ...requestData
        })

        next()
    }

    _handleError(error, req, res, next) {
        const {status = 500} = error

        console.error('Error occurred:', error)

        const response = {
            status,
            message: STATUS_CODES[status]
        }

        res.status(response.status).send(response)
    }

    setUpAPI() {
        this.router.use(bodyParser.json({type: 'application/json'}))
        this.router.use(this._logRequest)
        this.router.use(this.todos.getRouter())
        this.router.use(this._handleError)
    }
}

module.exports = API