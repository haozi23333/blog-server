/**
 * Created by haozi on 5/31/2017.
 */
import {Controller, Param, Get, HttpCode, UseInterceptor} from "routing-controllers"
import {Ctx} from "routing-controllers/decorator/Ctx"
import {IAuthContext} from "../../interfaces/KoaContext"
import {IUser, UserModule} from '../../models'
import MongoInterceptor from "../../intercept/MongoInterceptor"

@Controller('/api/user')
export class UsersController {
  @HttpCode(200)
  @Get('/:username')
  public async getUser(@Param('username') username: string, @Ctx() ctx: IAuthContext) {
    const UserInfo = (await UserModule.findOne({
      name: username
    })).toObject() as IUser
    delete UserInfo.password
    return UserInfo
  }
}
