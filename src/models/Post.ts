/**
 * Created by haozi on 2017/07/01.
 */
import {Schema, model, Model} from 'mongoose'
import IPost from './interface/IPost'
import {getHtml, getExcerpt} from "../tools/post";

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
PostSchema.statics.updateData = async function (postId: string, obj: IPost) {
    if (obj.markdown) {
        obj.html = getHtml(obj.markdown)
        obj.excerpt = getHtml(getExcerpt(obj.markdown))
    }
    obj.updateDate = new Date()
    return PostModel.update({postId}, obj)
}

interface IPostExtend extends Model<IPost>{
    updateData(postId: string, obj: IPost): Promise<IPost | null>
}

const PostModel = model<IPost>('post', PostSchema) as IPostExtend

export {
    IPost,
    PostModel,
    IPostExtend
}

