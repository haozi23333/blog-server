/**
 * Created by haozi on 5/31/2017.
 */
import {Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers"

@Controller('/api/users')
export class User {
  @Get('/login')
  public async login() {

  }

  @Post('/register')
  public async regsiter() {

  }

  @Put('/:user')
  public async updateUser(@Param('user') user: string, @Body() body: any) {

  }
}
