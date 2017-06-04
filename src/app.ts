import {connect} from 'mongoose'
import {createKoaServer, useKoaServer} from "routing-controllers"
import "reflect-metadata"
import {config} from './config'
import {App, getApp} from './api/app'
import * as Koa from 'koa'
import UA = require('koa-useragent')

const db = connect(config.dbLink)

async function start() {
    getApp()
    try{
        await getApp().waitLoad()
    } catch (e) {
        console.log('数据库连接失败')
    }
    const app = new Koa
    app.use(UA)
    useKoaServer(app, {
        controllers: [__dirname + "/controllers/**/*.js"],
        middlewares: [__dirname + "/middlewares/**/*.js"],
        interceptors: [__dirname + "/interceptors/**/*.js"],
        validation: false,
    }).listen(3000, () => {
        console.log(`server listen 3000 port`)
    })

}

start().then(() => {

})