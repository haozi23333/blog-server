/**
 * Created by haozi on 2017/06/03.
 */
import {Document, model, Schema } from 'mongoose'

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

    totalUser: number
    totalPosts: number

}

const AppSchema = new Schema({
    appName: String,
    version: String,
    ref: String,
    totalUser: Number,
    totalPosts: Number
})

const appModel = model<IApp>('postCommit', AppSchema)

export {
    IApp,
    appModel
}
