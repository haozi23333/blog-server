/**
 * Created by haozi on 6/1/2017.
 */
/**
 * 讲道理 这个系统就2 个人用 有必要这么做么
 */

import {IUser, IUserHistoryDevice, userModule} from '../../database/schemas/user'
import {config} from "../../config/index"
import md5 = require("md5")
import {v4} from 'uuid'

export interface ILoginParam {
  username: string
  passpwrd: string
  ua: string
  cookie?: string
  ip: string
}

export class User {
  constructor() {
    console.log(1)
  }

  public async find(username: string): Promise<IUser> {
    const user = await userModule.findOne({
      name: username,
    })
    if (!user) {
       throw {
         error: 'UnKnownUser',
         message: `没有找到用户名为${username}的用户`,
       }
    }
    return user
  }

  /**
   * 使用用户名和密码登录
   * @param wantLogin
   * @returns {Promise<string>}
   */
  public async login(wantLogin: ILoginParam): Promise<string> {
    const user = await userModule.findOne({
      name: wantLogin.username,
      password: this.genPassword(wantLogin.passpwrd),
    })
    if (!user) {
      throw {
        error: 'UserNameOrPasswordError',
        message: `用户名或密码错误`,
      }
    }
    const userCookie = await this.genCookie(wantLogin)
    // 默认7天的时间的cookie
    user.historyDevice.push({
      name: '还没有给它起名字 _(:зゝ∠)_',
      ip: wantLogin.ip,
      online: true,
      cookie: userCookie,
      ua: wantLogin.ua,
      destroy: false,
      createDate: new Date(),
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      lastLogin: new Date(),
    })
    try {
      await user.save()
      return userCookie
    }catch (e) {
      throw {
        error: 'dbError',
        message: e.message,
      }
    }
  }

  /**
   * 使用cookie登录
   * @param username
   * @param cookie
   * @returns {Promise<boolean>}
   */
  public async loginForCookie(username: string, cookie: string): Promise<boolean> {
    try {
      const user = await this.find(username)
      for (let i = 0; i < user.historyDevice.length; i++) {
        //  先看cookie是不是有效的
        if ( user.historyDevice[i].cookie === cookie && ! user.historyDevice[i].destroy) {
          // 判断cookie是否超时 如果超时那么 就把cookie设置为失效
          if ( user.historyDevice[i].expiryDate.getTime() < Date.now()) {
            user.historyDevice[i].destroy = true
            await user.save()
            return false
          }
          return true
        }
      }
      return false
    }catch (e) {
      throw {
        error: 'dbError',
        message: e.message,
      }
    }
  }

  /**
   * 生成cookie
   * @param info
   * @returns {string}
   */
  public genCookie(info: ILoginParam): string {
    return `${info.username}:` + v4().toString().replace(/\-/g, '')
  }

  // /**
  //  * 注册用户
  //  * 伪需求
  //  */
  // public register() {
  //
  // }

  public async createUser() {

  }
  /**
   * 更新用户信息
   */
  public updateInfo() {
    // TODO 懒得写
  }

  /**
   * 计算加盐之后的密码
   * @param psasword
   * @returns {string}
   */
  private genPassword(psasword: string): string {
    return md5(md5(psasword + config.userSalt) + 'haozi&')
  }
}
