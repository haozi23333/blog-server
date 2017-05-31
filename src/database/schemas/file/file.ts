/**
 * Created by haozi on 5/31/2017.
 */
import {Document, Schema, model} from 'mongoose'
import 'mongoose-schema-extend'

interface IFile extends Document {
  // 文件名
  name: string
  // 描述
  desription: string
  // 文件类型 -> 压缩文件 图片 视频 之类的进行处理
  type: string
  // CDN 文件地址
  cdnUrl: string
  // 服务器本地路径
  serverPath: string
  // http获取路径
  serverUrl: string
  // tag
  tags: string[]
  // 文件hash
  hash: string
  // 文件大小 单位KB
  size: number
  // 创建时间
  createBy: string
  // 创建日期
  createDate: Date
}
interface ISchema extends Schema {
  extend<T>(obj: T)
}

const FileSchema = new Schema({

}) as ISchema

const fileModule = model<IFile>('file', FileSchema)

export {
  IFile,
  FileSchema,
  fileModule,
}
