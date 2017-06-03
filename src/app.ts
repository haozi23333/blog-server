import {connect} from 'mongoose'
import {createKoaServer} from "routing-controllers"
import "reflect-metadata"
import {config} from './config'
import {App, getApp} from './api/app'


const db = connect(config.dbLink)

async function start() {
    getApp()
    try{
        await getApp().waitLoad()
    } catch (e) {
        console.log('数据库连接失败')
    }
    createKoaServer({
        controllers: [__dirname + "/controllers/**/*.js"],
        middlewares: [__dirname + "/middlewares/**/*.js"],
        interceptors: [__dirname + "/interceptors/**/*.js"],
        validation: false,
    }).listen(3000)

}