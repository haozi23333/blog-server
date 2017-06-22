import {KoaMiddlewareInterface, Middleware} from "routing-controllers"
import {IAppContext} from "../interfaces/KoaContext"
/**
 * Created by haozi on 2017/06/04.
 */

@Middleware({
    type: "before",
    priority: 100
})
export class GetCookie implements KoaMiddlewareInterface {
    public async use(ctx: IAppContext, next?: (err?: any) => Promise<any>) {
        ctx.token = ctx.cookies.get('token') || null
        await next()
    }
}
