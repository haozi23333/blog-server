/**
 * Created by haozi on 5/31/2017.
 */
import {Document, Schema, model} from 'mongoose'
import 'mongoose-schema-extend'
import {FileSchema, IFile} from "./file";

interface IDirectory extends Document {
    // 文件夹路径
    path: string,
    // 文件夹深度
    deep: number,
    // 文件夹名称
    name: string
    // 文件类型
    type: string | 'directory',
    childrens: IFile[],
    createDate: Date
}


const DirectorySchema = new Schema({
    path: String,
    deep: Number,
    name: String,
    type: String,
    // childrens: [FileSchema || DirectorySchema],
    createDate: Date
})

const directoryModule = model<IDirectory>('file', DirectorySchema)

export {
    IDirectory,
    DirectorySchema,
    directoryModule,
}
