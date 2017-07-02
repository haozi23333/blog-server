/**
 * Created by haozi on 2017/06/09.
 */
import {fileModule, IFile} from "../../database/schemas/Storage/file"
import {} from ''

/**
 * 文件夹操作
 */
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
            path
        })
    }

    /**
     * 按文件名搜索
     * @param name
     * @returns {Promise<void>}
     */
    public async findFileByName(name: string) {
        this.file = await fileModule.find({
            name
        })
    }

    public getFile() {
        return this.file
    }

    /**
     * 删除文件
     * @returns {Promise<void>}
     */
    public async remove() {
        await this.file.remove()
    }

    /**
     * 删除文件
     * @param path
     * @returns {Promise<void>}
     */
    public static async remove(path: string) {
        await fileModule.remove({
            path
        })
    }
}
