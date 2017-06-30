/**
 * Created by haozi on 2017/06/09.
 */
import {directoryModule, IDirectory} from "../../database/schemas/Storage/directory"

export default class directory {
    private dir: IDirectory
    public constructor() {

    }
    public async findDir(path: string) {
        directoryModule.findById({
            path: path
        })
    }
}
