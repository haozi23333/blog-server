/**
 * Created by haozi on 5/31/2017.
 */
import {Controller, Param, Body, Get, Post, Put, Delete} from "routing-controllers"
import {ValidationUserLoginForUsernamAndPassword} from '../validation/api/user'
import {Ctx} from "routing-controllers/decorator/Ctx"
import {Context} from "koa"

@Controller('/api/users')
export class User {
  @Get('/login')
  public async login(@Body() body: ValidationUserLoginForUsernamAndPassword, @Ctx() ctx: Context) {

  }

  @Put('/:user')
  public async updateUser(@Param('user') user: string, @Body() body: any) {

  }
}
