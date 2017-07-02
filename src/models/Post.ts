/**
 * Created by haozi on 2017/07/01.
 */
import {Schema, model} from 'mongoose'
import IPost from './interface/IPost'

const PostSchema = new Schema({
    postId: String,
    title: String,
    tags: [String],
    image: String,
    markdown: String,
    excerpt: String,
    html: String,
    isShow: {
        type: Boolean,
        default: false
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: Date,
    createBy: String,
})

/**
 * 以postid降序
 */
PostSchema.index({postId: -1})
const PostModel = model<IPost>('post', PostSchema)

export {
    IPost,
    PostModel
}

