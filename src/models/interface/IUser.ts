/**
 * Created by haozi on 2017/07/01.
 */
import {Document} from 'mongoose'
import IUserHistoryDevice from './IUserHistoryDevice'

interface IUser extends Document {
    name: string
    nickname: string
    email: string
    password: string
    // 状态/
    status: string,
    // 签名
    sign: string
    // 角色
    role: string[]
    faceImage: string
    // 用来保存单个权限
    permissions: string[]
    // 最后登录时间
    lastLogin: Date
    lastLoginIp: string
    historyDevice: IUserHistoryDevice[]
}

export default IUser
