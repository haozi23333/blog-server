import {connect} from 'mongoose'
import {useKoaServer} from "routing-controllers"
import "reflect-metadata"
import {config} from './config'
import * as Koa from 'koa'
import UA = require('koa-useragent')

const db = connect(config.dbLink)

async function start() {
    const app = new Koa()

    app.use(UA)

    useKoaServer(app, {
        controllers: [__dirname + "/controllers/**/*.js"],
        middlewares: [__dirname + "/middlewares/**/*.js"],
        interceptors: [__dirname + "/interceptors/**/*.js"],
        validation: true,
        defaultErrorHandler: true,
    }).listen(config.port, () => {
        console.log(`server listen ${config.port} port`)
    })
}

start().then(() => {})