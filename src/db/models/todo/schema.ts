import mongoose from 'mongoose'

import { ITodo } from '../../../types'

const { Types: mongooseTypes } = mongoose.Schema

export const todoSchema = new mongoose.Schema<ITodo>({
  user_id: {
    type: mongooseTypes.String,
    required: true,
  },
  text: {
    type: mongooseTypes.String,
    required: true,
  },
  is_completed: {
    type: mongooseTypes.Boolean,
    default: false,
  },
  due_date: {
    type: mongooseTypes.Date,
    required: true,
  },
  createdAt: {
    type: mongooseTypes.Date,
    default: Date.now(),
  },
})
