/**
 * Created by haozi on 6/4/2017.
 */

import {Body, BodyParam, Controller, Delete, Get, HttpCode, Post, Put} from "routing-controllers"
import {ValidationUserLoginForUsernamAndPassword} from "../validation/api/user"
import {Ctx} from "routing-controllers/decorator/Ctx"
import {IAppContext, IAuthContext} from "../../interfaces/KoaContext"
import {httpCode} from "../../httpCode"
import {UnauthorizedError} from "../../errors/UnauthorizedError"
import {InvaidRequestError} from "../../errors/InvaidRequestError";
import {UserModule} from "../../models/User";


@Controller('/api/sessions')
export class SessionController {
  @Get('/')
  public async getSession() {

  }

  /**
   * 创建了session的resource
   * @param body
   * @param ctx
   * @returns {Promise<any>}
   */
  @HttpCode(httpCode.CREATED)
  @Post('/')
  public async login(@Body({validate: {
                       validationError: {
                         target: false,
                         value: false
                       }
                     }}) body: ValidationUserLoginForUsernamAndPassword,
                     @Ctx() ctx: IAuthContext) {

    const cookie = await UserModule.login(body.username, body.password)
    if (!cookie) {
      throw new InvaidRequestError('用户名或密码错误')
    }
    ctx.cookies.set('token',  cookie, {
      expires: new Date(Date.now() + 7 * 3600000 * 24),
      httpOnly: true,
    })
    return {
      message: 'ok'
    }
  }

  /**
   * 登出
   * @param ctx
   * @param cookie
   * @returns {Promise<{message: string}>}
   */
  @HttpCode(httpCode.NOCONTENT)
  @Delete('/logout')
  public async logout(@Ctx() ctx: IAuthContext, @Body() cookie: string) {
    if( ctx.user) {
      throw new UnauthorizedError('你没有登录')
    }
    if (await UserModule.logout(ctx.user.name, ctx.token)) {
      return {
        message: 'ok'
      }
    } else {
      throw new Error('你试图登出了一个蜜汁 token 的账户')
    }
  }
}
