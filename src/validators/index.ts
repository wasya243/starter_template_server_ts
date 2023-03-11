import joi from 'joi'

import TodoValidators from './todo'

const Validators: { [key: string]: joi.ObjectSchema } = {
  ...TodoValidators,
}

export default Validators
