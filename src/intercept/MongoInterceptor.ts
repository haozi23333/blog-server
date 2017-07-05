/**
 * Created by haozi on 2017/07/06.
 */

import {Action} from "routing-controllers"
import {MongooseDocument} from "mongoose"

export default function MongoInterceptor<T extends MongooseDocument>(action: Action, content: MongooseDocument) {
    if (!content) {
        return {}
    }

    // 是否有 toObject 的接口
    let returnObj = content.toObject ? content.toObject() : {}

    // 除去 _id
    if((returnObj as MongooseDocument)._id) {
        delete (returnObj as MongooseDocument)._id
    }
    return returnObj
}
