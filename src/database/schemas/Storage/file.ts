/**
 * Created by haozi on 5/31/2017.
 */
import {Document, Schema, model} from 'mongoose'
import 'mongoose-schema-extend'

interface IFile extends Document {
  // 文件名
  name: string
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
  // 创建时间
  createDate: Date,
  size: number

}


const FileSchema = new Schema({
  name: String,
  type: String,
  cdnUrl: String,
  serverPath: String,
  serverUrl: String,
  tags: [String],
  hash: String,
  createDate: Date,
  size: Number
})

const fileModule = model<IFile>('file', FileSchema)

export {
  IFile,
  FileSchema,
  fileModule,
}
