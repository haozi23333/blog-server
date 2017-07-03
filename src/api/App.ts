/**
 * Created by haozi on 2017/07/03.
 */

import {AppModel, IApp} from "../models";


export default class App {
    private $app: IApp
    private $cacheDate: Date
    public get app(ignoreCache: boolean = false) {
        if(ignoreCache) {

        }
    }

    public constructor() {

    }

    public async loadApp() {

    }
    public getKey(key: string): Promise<string> {
        AppModel
    }

    public setKey(key: string, value: string): Promise<string> {

    }
}

