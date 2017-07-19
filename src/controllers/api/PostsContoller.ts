/**
 * Created by haozi on 2017/07/05.
 */
import {Controller, Param, Body, Get, Post, Put, Delete, HttpCode, QueryParams, ContentType} from "routing-controllers"
import {httpCode} from "../../httpCode";
import {PostModel} from "../../models";
import IPostQuery from "../../interfaces/IPostQuery";
import IPost from "../../models/interface/IPost";
import {Query} from "mongoose"
import {IAppContext} from "../../interfaces/KoaContext";
import {Ctx} from "routing-controllers/decorator/Ctx";

@Controller('/api/posts')
export default class PostsContoller {

    /**
     * 获取全部的 post
     * @param ctx
     * @return Primise<IPost[]>
     */
    @Get('/')
    public async getAllPost(@Ctx() ctx: IAppContext) {
        return await this.getPages({}, PostsContoller.checkQueryOpt(ctx.query))
    }

    /**
     * 查询 post 信息
     * 可以发送 /api/posts/1,2,3,4,5,6,7
     * @param postIds
     * @param ctx
     * @returns {Promise<Object>}
     */
    @HttpCode(httpCode.OK)
    @Get('/:postIds')
    public async getPosts(@Param('postIds') postIds: string, @Ctx() ctx: IAppContext) {
        // 懒得写查重
        const ids = postIds.split(',').filter(v => /^(\d*)$/.test(v) && v !== '')
        if (ids.length === 0) {
            return []
        }
        return await this.getPages({
            postId: ids
        }, PostsContoller.checkQueryOpt(ctx.query) )
    }

    /**
     * 查询 post 信息
     * @param title
     * @param ctx
     * @returns {Promise<Object>}
     */
    @HttpCode(httpCode.OK)
    @Get('/title/:title')
    public async getPostForTitle(@Param('title') title: string, @Ctx() ctx: IAppContext) {
        return await this.getPages({
            title: new RegExp(title, 'g')
        }, PostsContoller.checkQueryOpt(ctx.query))
    }

    /**
     * 处理后缀参数
     * limit
     * @param obj
     * @param postQuery
     */
    public async queryHandle(obj: IPostQuery | any, postQuery: IPostQuery): Promise<IPost[]> {
        postQuery = postQuery || {} as IPostQuery

        let query = PostModel.find(obj)
        /**
         * 分页查询
         */
        if (postQuery.page) {
            // 从0开始
            query.skip((postQuery.page - 1)   * (postQuery.limit || 10))
        }

        /**
         * 限制数量
         */
        if (postQuery.limit && Number.isInteger(postQuery.limit)) {
            query = query.limit(postQuery.limit)
        } else {
            // 默认限制 10 条
            query = query.limit(10)
        }
        // 按照postId反序
        query.sort({
            postId: -1
        })
        return (await query).map(v => {
            const returnObj = v.toObject ? v.toObject() : {}
            if ((returnObj as IPost)._id) {
                delete (returnObj as IPost)._id
            }
            return returnObj
        }) as IPost[]
    }

    private async getPages(obj: any,  postQuery: IPostQuery) {
        obj.isShow = !postQuery.showAll
        const data = await this.queryHandle(obj, postQuery)
        const count = await PostModel.count(obj)
        let prev = ""
        let next = ""
        if (postQuery.page > 1 && (count - postQuery.page * postQuery.limit !== 0)) {
            prev = `/api/posts?page=${postQuery.page - 1}&limit=${postQuery.limit}`
        } else {
            prev = ""
        }

        if (postQuery.page * postQuery.limit < count) {
            next = `/api/posts?page=${postQuery.page + 1}&limit=${postQuery.limit}`
        } else {
            next = ""
        }
        console.log(`count -> ${count}`)
        return {
            total: Math.ceil(count / postQuery.limit),
            prev,
            next,
            data
        }
    }

    private static checkQueryOpt(obj: IPostQuery) {
        obj = obj || {} as IPostQuery
        // 默认page 为1
        if (obj.page && Number.isInteger(Number(obj.page))) {
            obj.page = Number(obj.page)
        } else {
            obj.page = 1
        }
        // 默认limit 为 10
        if (obj.limit && Number.isInteger(Number(obj.limit))) {
            obj.limit = Number(obj.limit)
        } else {
            obj.limit = 10
        }

        if (obj.showAll && String(obj.showAll) === 'true') {
                obj.showAll = true
        } else {
            obj.showAll = false
        }
        return obj
    }
}

