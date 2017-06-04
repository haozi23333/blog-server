/**
 * Created by haozi on 6/4/2017.
 */

import {Body, BodyParam, Controller, Delete, Get, HttpCode, Post, Put} from "routing-controllers"
import {User} from "../../api/users/user"
import {ValidationUserLoginForUsernamAndPassword} from "../validation/api/user"
import {Ctx} from "routing-controllers/decorator/Ctx"
import {IAppContext, IAuthContext} from "../../interfaces/KoaContext"

@Controller('/api/sessions')
export class SessionController {
  @Get('/')
  public async getSession() {

  }

  /**
   * 创建了session的resource
   * @param body
   * @param ctx
   * @returns {Promise<{success: string}>}
   */
  @HttpCode(201)
  @Post('/')
  public async login(@Body({validate: {
    validationError: {
      target: false,
      value: true
    }
  }}) body: ValidationUserLoginForUsernamAndPassword,
                     @Ctx() ctx: IAppContext) {
    try {
      const user = new User()
      const newCookie = await user.login({
        username: body.username,
        passpwrd: body.passowd,
        ua: JSON.stringify(ctx.userAgent),
        ip: ctx.realIp,
      })
      ctx.set('ke', newCookie)
      if (ctx.haozi) {
        user.logout(ctx.haozi)
      }
      return {
        success: '登录成功'
      }
    } catch (e) {
      throw e
    }
  }

  @Delete('/')
  public async logout(@Ctx() ctx: IAuthContext) {
    try {
      if (!ctx.haozi) {
        return {
          error: 'UN_LOGIN',
          message: '你tm 都没有登录'
        }
      }
      await ctx.user.logout(ctx.haozi)
    } catch (e) {
      throw e
    }
  }
}
