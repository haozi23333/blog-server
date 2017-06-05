/**
 * Created by haozi on 2017/06/04.
 */

import {User} from "../api/users/user"
import {Context} from "koa"

interface IAppContext extends Context {
    userAgent: IKoaUseragent
    realIp: string
    haozi: string | null
    rawBody: string
}

interface IAuthContext extends IAppContext {
    user: User
}

export {
    IAppContext,
    IAuthContext
}
