/**
 * Created by haozi on 2017/07/01.
 */

interface IUserHistoryDevice {
    // 设备名称
    name: string
    // 设备ip
    ip: string
    // 设备UA(User-Agent)信息
    ua: string
    // cookie
    cookie: string
    createDate: Date
    expiryDate: Date
    lastLogin: Date
}

export default IUserHistoryDevice
