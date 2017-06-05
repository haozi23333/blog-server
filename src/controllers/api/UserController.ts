/**
 * Created by haozi on 5/31/2017.
 */
import {Controller, Param, Body, Get, Post, Put, Delete, HttpCode} from "routing-controllers"
import {ValidationUserLoginForUsernamAndPassword} from '../validation/api/user'
import {Ctx} from "routing-controllers/decorator/Ctx"
import {Context} from "koa"
import {User} from '../../api/users/user'
import {IAppContext, IAuthContext} from "../../interfaces/KoaContext";

@Controller('/api/users')
export class UserController {

  @Put('/:user')
  public async updateUser(@Param('user') user: string, @Body() body: any) {

  }

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
  @Get('/q')
  public async qwq(@Ctx() ctx: Context) {
    ctx.status = 300
    return 1
  }

  @Put('/logout')
  public async logout(@Ctx() ctx: IAuthContext, @Body() cookie: string) {
    ctx.user.logout()
  }
}
