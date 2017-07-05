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

    @Get('/')
    public async getAllPost(@Ctx() ctx: IAppContext) {
        const query = PostModel.find({})
        return (await this.queryHandle(query, ctx.query)).map(v => v.toJSON())
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
        const ids = postIds.split(',').filter(v => /^(\d*)$/.test(v) && v !== '')
        if (ids.length === 0) {
            return []
        }
        const query = PostModel.find({
            postId: postIds.split(',').filter(v => /\d/g)
        })
        return (await this.queryHandle(query, ctx.query)).map(v => v.toJSON())
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
        const query = PostModel.find({
            title: new RegExp(title, 'g')
        })
        return (await this.queryHandle(query, ctx.query)).map(v => v.toJSON())
    }

    /**
     * 处理后缀参数
     * limit
     * @param query
     * @param postQuery
     */
    public queryHandle<T>(query: Query<T>, postQuery: IPostQuery): Query<T> {
        postQuery = postQuery || {} as IPostQuery

        if (postQuery.limit && Number.isInteger(postQuery.limit)) {
            query = query.limit(postQuery.limit)
        } else {
            // 默认限制 10 条
            query = query.limit(10)
        }

        return query
    }
}

