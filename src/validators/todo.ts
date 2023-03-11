import joi from 'joi'

const createTodo = joi.object({
  user_id: joi.string().required(),
  text: joi.string().required(),
  due_date: joi.string().required(),
})

const patchTodo = joi.object({
  is_completed: joi.bool().required(),
})

const TodoValidators = {
  createTodo,
  patchTodo,
}

export default TodoValidators
