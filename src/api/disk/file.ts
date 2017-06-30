/**
 * Created by haozi on 2017/06/09.
 */
import {fileModule, IFile} from "../../database/schemas/Storage/file"

export default class directory {
    private file: IFile
    public constructor() {

    }

    /**
     * 按照文件路径搜索 只返回一个
     * @param path
     * @returns {Promise<void>}
     */
    public async findFileByPath(path: string) {
        await fileModule.findOne({
            path: path
        })
    }

    /**
     * 按文件名搜索
     * @param name
     * @returns {Promise<void>}
     */
    public async findFileByName(name: string) {
        
    }

    public getFile() {
        return this.file
    }
}
