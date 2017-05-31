/**
 * Created by haozi on 5/31/2017.
 */
import {Document, Schema, model} from 'mongoose'
interface IUser extends Document {
  name: string
  email: string
  password: string
  // 状态
  status: string,
  // 签名
  sign: string
  // 角色
  role: string[]
  // 用来保存单个权限
  permissions: string[]
  // 最后登录时间
  lastLogin: Date
  lastLoginIp: string
  historyDevice: [{
    // 设备名称
    name: string,
    // 设备ip
    ip: string,
    // 设备位置
    location: string,
    // 设备是否在线
    online: boolean,
    // 设备UA(User-Agent)信息
    ua: string,
    // cookie
    cookie: string
  }]
}

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  status: String,
  sign: String,
  role: [String],
  permissions: [String],
  lastLogin: Date,
  lastLoginIp: String,
  historyDevice: {
    type: [{
      name: String,
      ip: String,
      location: String,
      online: Boolean,
      cookie: String,
    }],
  },
})

const userModule = model<IUser>('user', UserSchema)

export {
  IUser,
  userModule,
}
