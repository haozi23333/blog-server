/**
 * Created by haozi on 5/31/2017.
 */
import {Document, Schema, model} from 'mongoose'

import {FileSchema, IFile} from './file'

interface ICompressed extends IFile {
  // 保存压缩文件格式
  format: string
  // 压缩文件目录 json格式
  index: string
  // 压缩文件密码
  password: string
}

const CompressedSchema = FileSchema.extend({
  format: String,
  index: String,
  password: {
    type: String,
    default: '',
  },
})

const compressedFileModule = model<ICompressed>('compressedFile', CompressedSchema)

export {
  ICompressed,
  compressedFileModule,
}
