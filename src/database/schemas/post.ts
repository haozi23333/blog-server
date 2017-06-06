/**
 * Created by haozi on 5/31/2017.
 */
import * as md5 from 'md5'
import {Document, model, Schema } from 'mongoose'

interface IPost extends Document {
  // 文章ID
  postId: string
  // 当前版本
  ref: string
  // 文章标题
  title: string
  // 标签
  tags: string[]
  // 文章图片(显示在文章列表用的) 储存
  image: string
  // markdown 储存
  markdown: string
  // 预编译好的html 储存
  html: string
  publish: boolean
  createDate: Date
  createBy: string
  updateDate: Date
  updateBy: string
  publishDate: Date
  publishBy: string
  excerpt: string
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
  id: String,
  message: String,
  date: Date,
  markdown: String,
  hash: String,
})

const PostSchema = new Schema({
  postId: String,
  ref: String,
  title: String,
  tags: [String],
  image: String,
  markdown: String,
  excerpt: String,
  html: String,
  publish: Boolean,
  createDate: Date,
  updateDate: Date,
  publishDate: Date,
  createBy: String,
  updateBy: String,
  publishBy: String,
  commits: [CommitSchena],
})

const postModel = model<IPost>('post', PostSchema)
const commitModel = model<ICommit>('postCommit', CommitSchena)

export {
  IPost,
  ICommit,
  postModel,
  commitModel,
}
