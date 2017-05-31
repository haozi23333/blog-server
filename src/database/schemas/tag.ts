/**
 * Created by haozi on 5/31/2017.
 */
import {Document, Schema, model} from 'mongoose'
interface ITag extends Document {
  // tag名称
  name: string
  // 描述
  desription: string
  // 优先级
  priority: number
  // 描述tag的图片
  image: string,
  // 拥有这些tag的文章
  posts: string[]
}

const TagSchema = new Schema({
  name: String,
  desription: String,
  priority: {
    type: Number,
    default: 0,
  },
  image: String,
  posts: [String],
})

const tagModule = model<ITag>('tag', TagSchema)

export {
  ITag,
  tagModule,
}
