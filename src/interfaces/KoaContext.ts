/**
 * Created by haozi on 2017/06/04.
 */

import {Context} from "koa"
import {IUser} from "../models";

interface IAppContext extends Context {
    userAgent : IKoaUseragent
    realIp    : string
    token     : string | null
    rawBody   : string
}

interface IAuthContext extends IAppContext {
    user: IUser
}

export {
    IAppContext,
    IAuthContext
}
