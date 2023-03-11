import createHttpError from 'http-errors'
import express from 'express'
import _ from 'lodash'

import Validators from '../validators'

export default function validate(validator: string, toValidate: string) {
  if (!validator) {
    throw new Error(`'${validator}' validator is not exist`)
  }

  return async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      req.body = await Validators[validator].validateAsync(_.get(req as any, toValidate))
      next()
    } catch (err: any) {
      if (err.isJoi) {
        return next(createHttpError(422, { message: err.message }))
      }
      next(createHttpError(500, { message: err.message }))
    }
  }
}
