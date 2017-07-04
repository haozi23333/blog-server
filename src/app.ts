import {connect} from 'mongoose'
import {useKoaServer} from "routing-controllers"
import "reflect-metadata"
import {config} from './config'
import * as Koa from 'koa'
import UA = require('koa-useragent')

const db = connect(config.dbLink)

async function start() {
    const app = new Koa()
    /**
     * 基础的错误处理
     */
    // app.use(async (ctx: IAppContext, next: () => {}) => {
    //     // todo 记得改
    //     try {
    //         await next()
    //     } catch (e) {
    //         const err = new ErrorHandle(e, ctx)
    //     }
    // })
    app.use(UA)
    // app.on('error', (err, ctx) => {
    //     console.log(err)
    // })
    useKoaServer(app, {
        controllers: [__dirname + "/controllers/**/*.js"],
        middlewares: [__dirname + "/middlewares/**/*.js"],
        interceptors: [__dirname + "/interceptors/**/*.js"],
        validation: true,
        defaultErrorHandler: false,
    }).listen(3000, () => {
        console.log(`server listen 3000 port`)
    })
}

start().then(() => {})