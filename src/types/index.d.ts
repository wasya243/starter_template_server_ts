import mongoose from 'mongoose'
export interface ITodo {
  _id: mongoose.Schema.Types.ObjectId
  user_id: string
  text: string
  is_completed: boolean
  due_date: Date
  createdAt: Date
}
