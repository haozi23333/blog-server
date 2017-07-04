/**
 * Created by haozi on 2017/07/01.
 */

import {Schema, model, Model, Query} from 'mongoose'
import IUser from './interface/IUser'
import IUserHistoryDevice from './interface/IUserHistoryDevice'
import md5 = require('md5')
import {config} from '../config'
import {v4} from 'uuid'


const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    status: String,
    sign: String,
    faceImage: String,
    nickname: String,
    role: {
        type: [String],
        default: [],
    },
    permissions: [String],
    lastLogin: Date,
    lastLoginIp: String,
    historyDevice: {
        type: [{
            name: String,
            ip: String,
            cookie: String,
            expiryDate: Date,
            createDate: Date
        }],
    },
})

/**
 * 登出
 * @param cookie
 * @returns {Promise<void>}
 */
UserSchema.methods.logout = async function (cookie: string) {
    this.historyDevice = this.historyDevice.filter(v => cookie === v)
    await this.save()
}
/**
 * 设置密码
 * @param password
 */
UserSchema.methods.setPassword = function (password: string) {
    this.password = UserModule.genPassword(password)
}

/**
 *  登录
 * @param username
 * @param password
 * @returns {Promise<string | null>}
 */
UserSchema.statics.login = async function (username: string, password: string): Promise<string | null> {
    const cookie: string = UserModule.genCookie(username)
    if (await UserModule.update({
            name: username,
            password: this.genPassword(password)
        }, {
            $push: {
                historyDevice: {
                    name: '还没有给它起名字 _(:зゝ∠)_',
                    cookie: cookie,
                    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                    lastLogin: new Date(),
                    createDate: new Date()
                }
            }
        })) {
        return cookie
    }
    return null
}

/**
 * 计算加盐的密码
 * @param psasword
 * @returns {string}
 */
UserSchema.statics.genPassword = function (psasword: string): string {
    return md5(md5(psasword + config.userSalt) + 'haozi&')
}

/**
 * 计算 cookie
 * @param username
 * @returns {string}
 */
UserSchema.statics.genCookie = function (username): string {
    return `${new Buffer(username).toString('base64')}:` + v4().toString().replace(/\-/g, '')
}

/**
 * 登出
 * @param username  被登出的用户名字
 * @param cookie    被登出的 cookie
 * @returns {Query<any>}
 */
UserSchema.statics.logout = function (username: string, cookie: string) {
    return UserModule.update(
        {
            name: username
        }, {
            $pull: {
                historyDevice: {
                    cookie: cookie
                }
            }
    })
}
/**
 * 使用 cookie 登录
 * @param username 用户名
 * @param cookie cookie
 * @returns {DocumentQuery<IUser, IUser>}
 */
UserSchema.statics.loginForCookie = function (username: string, cookie: string) {
    return UserModule.findOne({
        name: username,
        historyDevice: {
            cookie: cookie
        }
    })
}

/**
 * 扩展静态方法
 */
interface IUserExtend extends Model<IUser>{
    genPassword(password: string): string
    genCookie(username: string): string
    logout(username: string, cookie: string): Query<any>
    login(username: string, cookie: string): Promise<string | null>
    loginForCookie(username: string, cookie: string): Promise<IUser>
}

const UserModule: IUserExtend = model<IUser>('user', UserSchema) as IUserExtend

/**
 * 导出数据模型和定义
 */
export {
    IUser,
    IUserHistoryDevice,
    UserModule,
    IUserExtend
}
