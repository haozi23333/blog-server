/**
 * Created by haozi on 5/31/2017.
 */
import {Document, Schema, model} from 'mongoose'

interface IUserHistoryDevice {
  // 设备名称
  name: string
  // 设备ip
  ip: string
  // 设备是否在线
  online: boolean
  // 设备UA(User-Agent)信息
  ua: string
  // cookie
  cookie: string
  createDate: Date
  destroy: boolean
  destroyDate?: Date
  expiryDate: Date
  lastLogin: Date
}

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
      online: Boolean,
      cookie: String,
      ua: String,
      destroy: Boolean,
      createDate: Date,
      destroyDate: Date,
      expiryDate: Date,
      lastLogin: Date,
    }],
  },
})

const userModule = model<IUser>('user', UserSchema)

export {
  IUserHistoryDevice,
  IUser,
  userModule,
}
