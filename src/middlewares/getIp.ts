import {KoaMiddlewareInterface, Middleware} from "routing-controllers"
import {Context} from "koa"
import {IAppContext} from "../interfaces/KoaContext"
/**
 * Created by haozi on 2017/06/04.
 */

@Middleware({
    type: "before",
    priority: 1
})
export class GetRealIp implements KoaMiddlewareInterface {
    public async use(ctx: IAppContext, next?: (err?: any) => Promise<any>) {
        ctx.realIp = ctx.get('x-real-ip') || '?:?:?:?'
        await next()
    }
}
