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
        return await this.queryHandle({}, ctx.query)
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
        return await this.queryHandle({
            postId: ids
        }, ctx.query)
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
        return await this.queryHandle({
            title: new RegExp(title, 'g')
        }, ctx.query)
    }

    /**
     * 处理后缀参数
     * limit
     * @param obj
     * @param postQuery
     */
    public async queryHandle(obj: IPostQuery | any, postQuery: IPostQuery): Promise<IPost[]> {
        postQuery = postQuery || {} as IPostQuery

        if (postQuery.isShow) {
            console.log(postQuery)
            obj.isShow = !(postQuery.isShow === 'true')
            if (postQuery.isShow !== 'true') {
                obj.isShow = true
            } else {
                obj.isShow = false
            }
        } else {
            obj.isShow = false
        }

        let query = PostModel.find(obj)

        /**
         * 分页查询
         */
        if (postQuery.page) {
            if (Number(postQuery.page)) {
                query.skip(Number(postQuery.page) * (Number(postQuery.limit) || 10))
            }
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
        console.log(obj)
        return (await query).map(v => {
            const returnObj = v.toObject ? v.toObject() : {}
            if ((returnObj as IPost)._id) {
                delete (returnObj as IPost)._id
            }
            return returnObj
        }) as IPost[]
    }
}

