import {KoaMiddlewareInterface, Middleware} from "routing-controllers"
import {IAppContext, IAuthContext} from "../interfaces/KoaContext"
import {User} from "../api/users/user";
/**
 * Created by haozi on 2017/06/04.
 */

@Middleware({
    type: "before",
    priority: 2
})
export class GetUser implements KoaMiddlewareInterface {
    public async use(ctx: IAuthContext, next?: (err?: any) => Promise<any>) {
        ctx.user = null
        if (ctx.token) {
            const user = new User()
            await user.loginForCookie(new Buffer(ctx.token.split(':').shift(), 'base64').toString(), ctx.token)
            ctx.user = user
        }
        await next()
    }
}
