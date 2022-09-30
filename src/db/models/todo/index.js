const mongoose = require('mongoose');

const {todoSchema} = require('./schema');

const Todo = mongoose.model('Todo', todoSchema, 'todos');

module.exports = {
  Todo
};