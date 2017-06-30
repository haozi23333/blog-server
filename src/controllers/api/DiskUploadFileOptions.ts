/**
 * Created by haozi on 2017/06/29.
 */

import Multer = require("multer")
import {config} from '../../config'
export default () => {
    return  {
        storage: Multer.diskStorage({
            destination: (req: any, file: Express.Multer.File, cb: any) => {
                cb(null, config.storageLocal)
            },
            filename: (req: any, file: Express.Multer.File, cb: any) => {
                cb(null, file.originalname)
            }
        }),
        fileFilter: (req: any, file: Express.Multer.File, cb: (err: Error|null, resflus: boolean ) => {}) => {
            cb(null, true)
        },
        limits: {
            fieldNameSize: 255,
            fileSize: 1024 * 1024 * 100
        }
    }
};