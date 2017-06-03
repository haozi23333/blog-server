/**
 * Created by haozi on 5/31/2017.
 */
import {Controller, Param, Body, Get, Post, Put, Delete, HttpCode} from "routing-controllers"
import {ValidationUserLoginForUsernamAndPassword} from '../validation/api/user'
import {Ctx} from "routing-controllers/decorator/Ctx"
import {Context} from "koa"
import {User} from '../../api/users/user'
import {IUser} from "../../database/schemas/user";

interface AuthContext extends Context{
  user: User
}

@Controller('/api/users')
export class UserController {
  @Get('/login')
  public async login(@Body() body: ValidationUserLoginForUsernamAndPassword, @Ctx() ctx: Context) {

  }

  @Put('/:user')
  public async updateUser(@Param('user') user: string, @Body() body: any) {

  }

  @HttpCode(201)
  @Post('/')
  public async createUser(@Param('username') username: string, @Param('userPassword') userPassword: string, @Ctx() ctx: Context) {
    try {
      const newUser = new User
      return await newUser.createUser(username, userPassword)
    } catch (e) {
      if(e.message === 'dbError') {
        ctx.status = 500
        return {
          error: 'INTERNAL SERVER ERROR'
        }
      } else {
        ctx.state = 401
        return {
          error: '辣鸡你有权限么'
        }
      }
    }
  }
  @Get('/q')
  public async qwq(@Ctx() ctx: Context) {
    ctx.status = 300
    return 1
  }

  @Put('/logout')
  public async logout(@Ctx() ctx: AuthContext, @Body() cookie: string) {
    ctx.user.logout()
  }
}
