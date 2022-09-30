const mongoose = require('mongoose');
const {Types: mongooseTypes} = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  user_id: {
    type: mongooseTypes.String,
    required: true
  },
  text: {
    type: mongooseTypes.String,
    required: true
  },
  is_completed: {
    type: mongooseTypes.Boolean,
    default: false
  },
  due_date: {
    type: mongooseTypes.Date,
    required: true
  },
  createdAt: {
    type: mongooseTypes.Date,
    default: Date.now()
  }
});

module.exports = {
  todoSchema
};