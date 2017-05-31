import "reflect-metadata"
import {createKoaServer} from "routing-controllers"

createKoaServer({
    controllers: [__dirname + "/controllers/**/*.js"],
    middlewares: [__dirname + "/middlewares/**/*.js"],
    interceptors: [__dirname + "/interceptors/**/*.js"]
}).listen(3000)
