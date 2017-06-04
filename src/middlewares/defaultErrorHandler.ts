/**
 * Created by haozi on 6/4/2017.
 */
import {KoaMiddlewareInterface, Middleware} from "routing-controllers"
import {IAppContext} from "../interfaces/KoaContext"
import {IBadRequestError} from "../interfaces/BadRequestError"
//
// export function defaultErrorHandler(err: Error, ctx: IAppContext) {
//   console.log('服务器出错了')
//   console.log('错误信息 -> name -> ' + err.message)
//   console.log('错误信息 -> message ->' + err.message)
//   if (err.name === 'BadRequestError') {
//     ctx.body = JSON.stringify({
//       error: 'BadRequestError',
//       message: (err as IBadRequestError).errors
//     })
//     ctx.status = 400
//   }
// }
// @Middleware({
//   type: "after"
// })
// export class DefaultErrorHandler implements KoaMiddlewareInterface {
//   public async use(ctx: IAppContext, next?: (err?: any) => Promise<any>) {
//     console.log('body ->' + ctx.body)
//     await next()
//   }
// }
