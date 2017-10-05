/**
 * Created by haozi on 2017/07/01.
 */

import {model, Schema, Model} from 'mongoose'
import IApp from './interface/IApp'

const AppSchema = new Schema({
    appName   : String,
    version   : String,
    ref       : String,
    totalUser : Number,
    nowPostId : Number
})

interface IAppExtend extends Model<IApp> {
}

const AppModel = model<IApp>('app', AppSchema) as IAppExtend

export {
    IApp,
    AppModel,
    IAppExtend
}
