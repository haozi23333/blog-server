/**
 * Created by haozi on 2017/07/01.
 */

import {Document} from 'mongoose'

interface IApp extends Document {
    /**
     * 程序名称
     */
    appName: string
    /**
     * 程序版本(版本号)
     */
    version: string
    /**
     * 当前版本(github)
     */
    ref: string
    /**
     * 用户总数
     */
    totalUser: number
    /**
     * 文章总数
     */
    totalPosts: number,
    /**
     * 目前最后一篇文章 id
     */
    postId: number,
}

export default IApp
