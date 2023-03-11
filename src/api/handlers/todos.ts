import createHttpError from 'http-errors';
import express from 'express';

import { Todo } from '../../db/models/todo';

export class Todos {
    createTodo = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        try {
            const {text, user_id, due_date} = req.body;

            const todoDoc = new Todo({
                text,
                user_id,
                due_date
            });

            await todoDoc.save();

            res.send('saved');
        } catch (err: any) {
            next(createHttpError(500, {message: err.message}));
        }
    }

    async deleteTodo(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            const id = req.params.id;

            await Todo.deleteOne({_id: id});

            res.send('deleted');
        } catch (err: any) {
            next(createHttpError(500, {message: err.message}));
        }
    }

    async patchTodo(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const {is_completed} = req.body;

            await Todo.updateOne({_id: id}, {is_completed});

            res.send('updated');
        } catch (err: any) {
            next(createHttpError(500, {message: err.message}));
        }
    }

    async getTodos(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            const userId = req.params.id;

            const todos = await Todo.find({user_id: userId});

            res.send(todos);
        } catch (err: any) {
            next(createHttpError(500, {message: err.message}));
        }
    }
}
