/**
 * Created by haozi on 6/1/2017.
 */
/**
 * 讲道理 这个系统就2 个人用 有必要这么做么
 */

import {IUser, IUserHistoryDevice, userModule} from '../../database/schemas/user'
import {config} from "../../config/config"
import md5 = require("md5")
import {v4} from 'uuid'
import {assign} from 'lodash'

export interface ILoginOption {
  // 用户名
  username: string
  // 用户密码
  passpwrd: string
  // 用户登录时候的 user-agent
  ua: string
  // 登录的 cookie
  cookie?: string
  // 登录的时候的 IP 信息
  ip: string
}

export class User {
  private user: IUser = null
  constructor() {

  }

  /**
   * 返回??????历史设备
   * @returns {IUserHistoryDevice[]}
   */
  public getHistoryDevice() {
    return this.user.historyDevice
  }

  public getUser() {
    return this.user
  }

  public setUser(user: IUser) {
    this.user = user
  }

  public async find(username: string): Promise<void> {
    const user = await userModule.findOne({
      name: username,
    })
    this.user = user
    if (!user) {
       throw {
         error: 'UnKnownUser',
         message: `没有找到用户名为${username}的用户`,
       }
    }
  }

  /**
   * 使用用户名和密码登录
   * @param wantLogin
   * @returns {Promise<string>}
   */
  public async login(wantLogin: ILoginOption): Promise<string> {
    const user = await userModule.findOne({
      name: wantLogin.username,
      password: User.genPassword(wantLogin.passpwrd),
    })
    if (!user) {
      throw {
        error: 'UserNameOrPasswordError',
        message: `用户名或密码错误`,
      }
    }
    const userCookie = User.genCookie(wantLogin)
    // 默认7天的时间的cookie
    const now = new Date()
    user.historyDevice.push({
      name: '还没有给它起名字 _(:зゝ∠)_',
      ip: wantLogin.ip,
      online: true,
      cookie: userCookie,
      ua: wantLogin.ua,
      destroy: false,
      createDate: now,
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      lastLogin: now,
    })
    try {
      this.setUser(await user.save())
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
      await this.find(username)
      // todo 这里的 cookie 处理要单独成一个类来操作 这里就懒得改了等一波重构
      for (let i = 0; i < this.getHistoryDevice().length; i++) {
        //  先看cookie是不是有效的
        if ( this.getHistoryDevice()[i].cookie === cookie && ! this.getHistoryDevice()[i].destroy) {
          // 判断cookie是否超时 如果超时那么 就把cookie设置为失效
          if ( this.getHistoryDevice()[i].expiryDate.getTime() < Date.now()) {
            this.getHistoryDevice()[i].destroy = true
            await this.getUser().save()
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
   * 登出 如果 cookie 为空的话是 退出所有登录的 cookie
   * @param cookie
   * @returns {Promise<void>}
   */
  public async logout(cookie?: string) {
    if (!cookie) {
      this.user.historyDevice = []
    }
    this.user.historyDevice = this.getHistoryDevice().filter((v) => {
      if (v.cookie === cookie) {
        return false
      }
      return true
    })
    await this.user.save()
  }

  // /**
  //  * 注册用户
  //  * 伪需求
  //  */
  // public register() {
  //
  // }
  /**
   * 还是做个创建用户吧 还是要用的
   * @returns {Promise<void>}
   */
  public async createUser(userName, userPassword) {
    const newUser = new userModule({
      name: userName,
      nickname: '_(:зゝ∠)_',
      email: '没有邮箱快滚',
      password: User.genPassword(userPassword),
      status: 'qwq',
      sign: '这里是一条假签名',
      // 角色
      role: [],
      faceImage: '',
      // 用来保存单个权限
      permissions: [],
      // 最后登录时间
      lastLogin: null,
      lastLoginIp: '',
      historyDevice: [],
    })
    try {
      this.setUser(await newUser.save())
      return {
        success: 'createUer',
        message: `new user id -> ${userName}`
      }
    } catch (e) {
      throw  {
        error: 'dbError',
        message: e.message,
      }
    }
  }

  /**
   * 获取用户信息
   * @param isAuth 是否验证权限
   * @returns {IUser}
   */
  public getInfo(isAuth: boolean) {
    const userObj = this.getUser().toObject({
      virtuals: false
    }) as IUser
    delete userObj.password
    if (!isAuth) {
      delete userObj.historyDevice
    }
    return userObj
  }

  /**
   * 设置用户信息
   */
  public async setInfo(obj: any) {
    try {
      assign(this.user, obj)
      await this.user.save()
    } catch (e) {
      throw e
    }
  }

  /**
   * 设置用户权限
   * @param permission
   * @returns {Promise<boolean>}
   */
  public async setPermission(permission: string) {
    if ( !this.checkPermission(permission)) {
      this.getUser().permissions.push(permission)
      await this.getUser().save()
    }
    return true
  }

  /**
   * 检查是否有权限
   * @param permission
   * @returns {boolean}
   */
  public checkPermission(permission: string) {
    for (let i = 0; i < this.getUser().permissions.length; i++) {
      if (this.getUser().permissions[i] === permission) {
        return true
      }
    }
    return false
  }

  /**
   * 获取全部的 cookie
   * @returns {IUserHistoryDevice[]}
   */
  public getAllCookies() {
    return this.getHistoryDevice()
  }

  /**
   * 计算加盐之后的密码
   * @param psasword
   * @returns {string}
   */
  public static genPassword(psasword: string): string {
    return md5(md5(psasword + config.userSalt) + 'haozi&')
  }
  /**
   * 生成cookie
   * @param info
   * @returns {string}
   */
  public static genCookie(info: ILoginOption): string {
    return `${new Buffer(info.username).toString('base64')}:` + v4().toString().replace(/\-/g, '')
  }
}
