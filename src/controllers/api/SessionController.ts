/**
 * Created by haozi on 6/4/2017.
 */

import {Body, BodyParam, Controller, Delete, Get, HttpCode, Post, Put} from "routing-controllers"
import {User} from "../../api/users/user"
import {ValidationUserLoginForUsernamAndPassword} from "../validation/api/user"
import {Ctx} from "routing-controllers/decorator/Ctx"
import {IAppContext, IAuthContext} from "../../interfaces/KoaContext"
import {httpCode} from "../../httpCode"
import {UnauthorizedError} from "../../errors/UnauthorizedError"


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
  @HttpCode(201)
  @Post('/')
  public async login(@Body({validate: {
                       validationError: {
                         target: false,
                         value: false
                       }
                     }}) body: ValidationUserLoginForUsernamAndPassword,
                     @Ctx() ctx: IAuthContext) {
    console.log(ctx.user)
    if (ctx.user) {
      return {
        message: '你已经登录了 = = '
      }
    }
    const user = new User()
    const newCookie = await user.login({
      username: body.username,
      password: body.password,
      ua: JSON.stringify(ctx.userAgent),
      ip: ctx.realIp,
    })
    ctx.cookies.set('token', newCookie, {
      expires: new Date(Date.now() + 7 * 3600000 * 24),
      httpOnly: false
    })
    // if (ctx.haozi) {
    //   await user.logout(ctx.haozi)
    // }
    return {}
  }

  @Delete('/')
  public async logout(@Ctx() ctx: IAuthContext) {
    if (!ctx.token) {
      throw new UnauthorizedError('你还没有登录')
    }
    await ctx.user.logout(ctx.token)
  }
}
