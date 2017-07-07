// /**
//  * Created by haozi on 2017/06/29.
//  */
//
// import {
//     Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UploadedFile, UploadedFiles,
//     Head
// } from "routing-controllers"
// import {NotFoundError} from "../../errors/NotFoundError"
// import fileUploadOptions from './DiskUploadFileOptions'
// import {Ctx} from "routing-controllers/decorator/Ctx"
// import {IAuthContext} from "../../interfaces/KoaContext"
// import {UnauthorizedError} from "../../errors/UnauthorizedError"
//
// @Controller('/api/disk')
// export default class DiskContoller {
//
//     @Get('/file/:fileKey')
//     public getFile(@Param('fileKey') fileKey: string) {
//         throw  new  NotFoundError(`key -> ${fileKey} 文件不存在`)
//     }
//
//     /**
//      * 上传新的文件
//      * @param file
//      */
//     @HttpCode(200)
//     @Post('/file')
//     public createFile(@UploadedFile('file', {
//         options: fileUploadOptions()
//     }) file: Express.Multer.File, @Ctx() ctx: IAuthContext, @Body() body){
//         if (!ctx) {
//             throw new UnauthorizedError('你并没有权限')
//         }
//         console.log(file)
//         return {
//             message: `file -> ${file.originalname} save ok!!!`
//         }
//     }
//
//     /**
//      * 更新已有文件
//      * @param file
//      */
//     @HttpCode(200)
//     @Put('/file')
//     public async putFile(@UploadedFile('file', {
//         options: fileUploadOptions()
//     }) file: Express.Multer.File){
//         console.log(file)
//         return {
//             message: `file -> ${file.originalname} ok!!!`
//         }
//     }
//
//     @Head('/file/:fileKey')
//     public getPathInfo() {
//
//     }
// }
