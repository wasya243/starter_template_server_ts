const createHttpError = require('http-errors');

const validators = require('../validators');

function validate(validator, toValidate) {
  if (!validator) {
    throw new Error(`'${validator}' validator is not exist`);
  }

  return async function (req, res, next) {
    try {
      req.body = await validators[validator].validateAsync(req[toValidate]);
      next();
    } catch (err) {
      if (err.isJoi) {
        return next(createHttpError(422, { message: err.message }));
      }
      next(createHttpError(500, { message: err.message }));
    }
  };
}

module.exports = validate;
