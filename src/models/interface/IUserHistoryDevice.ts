/**
 * Created by haozi on 2017/07/01.
 */

interface IUserHistoryDevice {
    // 设备名称
    name: string
    // cookie
    cookie: string
    createDate: Date
    expiryDate: Date
    lastLogin: Date
}

export default IUserHistoryDevice
