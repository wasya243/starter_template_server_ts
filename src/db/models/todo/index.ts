import mongoose from 'mongoose'

import { ITodo } from '../../../types'
import { todoSchema } from './schema'

export const Todo = mongoose.model<ITodo>('Todo', todoSchema, 'todos')
