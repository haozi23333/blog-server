/**
 * Created by haozi on 2017/07/05.
 */

import {Controller, Get, HttpCode} from "routing-controllers"
import {AppModel} from "../../models/App";
import {httpCode} from "../../httpCode";

@Controller('/api/app')
export default class AppContoller {
    @HttpCode(httpCode.OK)
    @Get('/')
    public async getInfo() {
        return (await AppModel.findOne({
            appName: 'blog'
        })).toObject()
    }
}
