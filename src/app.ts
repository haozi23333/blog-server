import {connect} from 'mongoose'
import {useKoaServer} from "routing-controllers"
import "reflect-metadata"
import {config} from './config'
import {App, getApp} from './api/app'
import * as Koa from 'koa'
import UA = require('koa-useragent')
import {Context} from "koa"

const db = connect(config.dbLink)

async function start() {
    getApp()
    try {
        await getApp().waitLoad()
    } catch (e) {
        console.log('数据库连接失败')
    }
    const app = new Koa()
    /**
     * 基础的错误处理
     */
    app.use(async (ctx: Context, next: () => {}) => {
        // todo 记得改
        console.log(2333)
        try {
            await next()
        } catch (e) {
            console.log('捕捉到了')
            console.log(e.message)
        }
    })
    app.use(UA)
    app.on('error', (err, ctx) => {
        console.log(err)
    })
    useKoaServer(app, {
        controllers: [__dirname + "/controllers/**/*.js"],
        middlewares: [__dirname + "/middlewares/**/*.js"],
        interceptors: [__dirname + "/interceptors/**/*.js"],
        validation: false,
        errorOverridingMap: {

        }
    }).listen(3000, () => {
        console.log(`server listen 3000 port`)
    })
}

start().then(() => {})