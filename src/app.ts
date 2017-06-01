import {connect} from 'mongoose'
import {createKoaServer} from "routing-controllers"
import "reflect-metadata"

const db = connect('mongodb://127.0.0.1/blog')

createKoaServer({
    controllers: [__dirname + "/controllers/**/*.js"],
    middlewares: [__dirname + "/middlewares/**/*.js"],
    interceptors: [__dirname + "/interceptors/**/*.js"],
    validation: false,
}).listen(3000)
