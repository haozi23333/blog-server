/**
 * Created by haozi on 6/5/2017.
 */

import {BadRequestError, ForbiddenError, InvaidRequestError, NotFoundError, UnauthorizedError} from "./errorType"
import {IAppContext} from "../interfaces/KoaContext"
import {IError} from "./IError";

// const errHandleMap = {
//   [NotFoundError]: {
//     httpCode: 404,
//     message: '404 了 yo~'
//   },
//   [ForbiddenError]: {
//     httpCode: 403,
//     message: '权限不足吧'
//   },
//   [UnauthorizedError]: {
//     httCode: 401,
//     message: '兄弟你没有登录吧'
//   },
//   [InvaidRequestError]: {
//     httpCode: 400,
//   }
// }
//
// export {
//   errHandleMap
// }

export class ErrorHandle {
  private error: IError
  private ctx: IAppContext
  constructor(e: IError, ctx: IAppContext) {
    this.error = e
    this.ctx = ctx
    this.setHeader()
    try {
      this.ctx.body = JSON.stringify(this.parseError())
    } catch (e) {
      this.setStatus(500)
      this.ctx.body = JSON.stringify({
        error: '服务器卒',
        message: '没有快滚'
      })
    }
  }

  public setHeader() {
    this.ctx.set('Content-Type', 'application/json')
  }

  public setStatus(statusCode: number) {
    this.ctx.status = statusCode
  }

  public parseError(): any {
    this.setStatus(this.error.httpCode || 500)
    switch (this.error.name) {
      case NotFoundError:
      case ForbiddenError:
      case UnauthorizedError:
      case InvaidRequestError:
      case 'SyntaxError':
      case 'TypeError':
        return {
          name: this.error.name,
          message: this.error.message,
          errors: this.error.errors,
          httpCode: this.error.httpCode,
        }
      case BadRequestError:
        if (this.error.message === `Invalid body, check 'errors' property for more info.`) {
          return {
            httpCode: 400,
            name: BadRequestError,
            message: '参数错误请检查',
            errors: this.error.errors,
            doc: '此处应该有doc文档',
          }
        }
        return this.error
      default:
        console.log(this.error.name)
        return this.error
    }
  }
}

