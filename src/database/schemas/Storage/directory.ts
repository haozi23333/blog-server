/**
 * Created by haozi on 5/31/2017.
 */
import {Document, Schema, model} from 'mongoose'
import 'mongoose-schema-extend'
import {FileSchema, IFile} from "./file";

interface IDirectory extends Document {
    // 文件夹路径
    path: string,
    // 文件夹名称
    name: string
    childrens: string[],
    createDate: Date
}

const DirectorySchema = new Schema({
    path: String,
    name: String,
    childrens: [String],
    createDate: Date
})

const directoryModule = model<IDirectory>('file', DirectorySchema)

export {
    IDirectory,
    DirectorySchema,
    directoryModule,
}
