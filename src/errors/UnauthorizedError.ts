/**
 * Created by haozi on 6/5/2017.
 */

import * as type from './errorType'
import {IError} from "./IError"

export class UnauthorizedError extends Error implements IError {
  public name = type.UnauthorizedError
  public message = ''
  public errors: string[] = []
  public httpCode = 401
  constructor(errMessage: string, errors: string[] = []) {
    super(errMessage)
    this.message = errMessage
    this.errors = errors
  }
}
