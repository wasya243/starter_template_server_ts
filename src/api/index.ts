import express from 'express';
import bodyParser from 'body-parser';
import { STATUS_CODES } from 'http';

import { TodosRouter as Todos } from './routes/todos';

export class API {
    private readonly router: express.Router;
    private readonly todos: Todos;
    constructor() {
        this.router = express.Router();
        this.todos = new Todos();
        this.setUpAPI();
    }

    getAPI(): express.Router {
        return this.router;
    }

    private logRequest(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const requestData = {
            url: req.url,
            date: new Date().toISOString(),
            method: req.method
        };

        console.log('Request made:', {
            ...requestData
        });

        next();
    }

    _handleError(error: any, req: express.Request, res: express.Response, next: express.NextFunction): void {
        const {status = 500} = error;

        console.error('Error occurred:', error);

        const response = {
            status,
            message: status === 500 ? STATUS_CODES[status] : error.message || STATUS_CODES[status]
        };

        res.status(response.status).send(response);

        next();
    }

    setUpAPI() {
        this.router.use(bodyParser.json());
        this.router.use(bodyParser.urlencoded({ extended: true }))
        this.router.use(this.logRequest);
        this.router.use('/api', this.todos.getRouter());
        this.router.use(this._handleError);
    }
}
