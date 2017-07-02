/**
 * Created by haozi on 2017/07/01.
 */

import {Schema, model} from 'mongoose'
import IUser from './interface/IUser'
import IUserHistoryDevice from './interface/IUserHistoryDevice'

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
            location: String,
            cookie: String,
            ua: String,
            expiryDate: Date,
            lastLogin: Date
        }],
    },
})



const UserModule = model<IUser>('user', UserSchema)

/**
 * 导出数据模型和定义
 */
export {
    IUser,
    IUserHistoryDevice,
    UserModule,
}