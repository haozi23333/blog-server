/**
 * Created by haozi on 2017/07/01.
 */

import {model, Schema} from 'mongoose'
import IApp from './interface/IApp'

const AppSchema = new Schema({
    appName: String,
    version: String,
    ref: String,
    totalUser: Number,
    totalPosts: Number,
    postId: Number
})


const AppModel = model<IApp>('postCommit', AppSchema)

export {
    IApp,
    AppModel
}
