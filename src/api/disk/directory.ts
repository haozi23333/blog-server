/**
 * Created by haozi on 2017/06/09.
 */
import {directoryModule, IDirectory} from "../../database/schemas/Storage/directory"

export default class directory {
    private dir: IDirectory
    public constructor() {

    }
    public async findDir(path: string) {
        this.dir = await directoryModule.findOne({
            path: path
        })
        return this.dir
    }

    public getDir() {
        return this.dir
    }

}
