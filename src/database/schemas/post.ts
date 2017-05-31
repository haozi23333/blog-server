/**
 * Created by haozi on 5/31/2017.
 */
import * as md5 from 'md5'
import {Document, model, Schema } from 'mongoose'

interface IPost extends Document {
  postId: string
  ref: string
  title: string
  tags: string[]
  image: string
  markdown: string
  html: string
  publish: boolean
  createDate: Date
  createBy: string
  updateDate: Date
  updateBy: string
  publishDate: Date
  publishBy: string
  commits: ICommit[]
}

interface ICommit extends Document {
  id?: string
  message: string
  date?: Date
  markdown: string,
  hash: string,
}

const CommitSchena = new Schema({
  id: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  markdown: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: false,
    default: '',
  },
})

const PostSchema = new Schema({
  // 文章ID
  postId: {
    type: String,
    required: true,
  },
  // 当前版本
  ref: {
    type: String,
    required: true,
  },
  // 文章标题
  title: {
    type: String,
    required: true,
  },
  // 标签
  tags: {
    type: [String],
    required: true,
  },
  // 文章图片(显示在文章列表用的) 储存
  image: {
    type: String,
    required: true,
  },
  // markdown 储存
  markdown: {
    type: String,
    required: true,
  },
  // 预编译好的html 储存
  html: {
    type: String,
    required: true,
  },
  // markdown 储存
  publish: {
    type: Boolean,
    required: true,
    default: false,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  createBy: {
    type: String,
    default: Date.now,
  },
  updateBy: {
    type: String,
    default: Date.now,
  },
  publishBy: {
    type: String,
    required: false,
  },
  commits: {
    type: [CommitSchena],
    required: false,
  },
})

const postModel = model<IPost>('post', PostSchema)
const commitModel = model<ICommit>('postCommit', CommitSchena)

export {
  IPost,
  ICommit,
  postModel,
  commitModel,
}
