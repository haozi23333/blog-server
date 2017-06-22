/**
 * Created by haozi on 5/31/2017.
 */
import {Controller, Param, Body, Get, Post, Put, Delete, HttpCode} from "routing-controllers"
import {ValidationUserLoginForUsernamAndPassword} from '../validation/api/user'
import {Ctx} from "routing-controllers/decorator/Ctx"
import {Context} from "koa"
import {User} from '../../api/users/user'
import {IAppContext, IAuthContext} from "../../interfaces/KoaContext"
import {getApp} from "../../api/app"
import {UnauthorizedError} from "../../errors/UnauthorizedError";

@Controller('/api/users')
export class UsersController {

  @HttpCode(201)
  @Post('/')
  public async createUser(@Body() body: ValidationUserLoginForUsernamAndPassword, @Ctx() ctx: IAuthContext
  ) {
    try {
      if  (!ctx.user) {
        ctx.throw(403)
      }
      if (ctx.user.checkPermission('admin.createUser')) {
        ctx.throw(403)
      }
      const newUser = new User()
      return await newUser.createUser(body.username, body.password)
    } catch (e) {
      if (e.message === 'dbError') {
        ctx.status = 500
        return {
          error: 'INTERNAL SERVER ERROR'
        }
      }
      throw e
    }
  }

  @Put('/logout')
  public async logout(@Ctx() ctx: IAuthContext, @Body() cookie: string) {
    await ctx.user.logout()
  }
}

@Controller('/api/user')
export class UserController {
  @Put('/:username')
  public async updateUser(@Param('username') username: string, @Body() body: any, @Ctx() ctx: IAuthContext) {
    if (ctx.user) {
      const user = new User()
      user.setUser(getApp().users.getUser(username))
      user.setInfo(body)
    } else  {
      throw new UnauthorizedError('没有权限')
    }
  }
  @HttpCode(200)
  @Get('/:username')
  public async getUser(@Param('username') username: string, @Ctx() ctx: IAuthContext) {
    const user = new User()
    user.setUser(getApp().users.getUser(username))
    return user.getInfo(!!ctx.user)
  }
}
