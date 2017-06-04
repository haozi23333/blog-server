/**
 * Created by haozi on 2017/06/04.
 */

import {User} from "../api/users/user";
import {Context} from "koa";

interface AppContext extends Context{
    userAgent: IKoaUseragent
    realIp: string
}

interface AuthContext extends AppContext{
    user: User
}

export {
    AppContext,
    AuthContext
}