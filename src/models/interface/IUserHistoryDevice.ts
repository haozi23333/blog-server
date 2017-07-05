/**
 * Created by haozi on 2017/07/01.
 */

interface IUserHistoryDevice {
    // cookie
    cookie: string
    // 创建时间
    createDate: Date
    // 过期时间
    expiryDate: Date
    // 最后一次登录
    lastLogin: Date
}

export default IUserHistoryDevice
