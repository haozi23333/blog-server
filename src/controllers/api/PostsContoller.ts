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
        let query = PostModel.find({})
        return (await this.queryHandle(query, ctx.query)).map(v => v.toJSON())
    }
    /**
     * 查询 post 信息
     * @param postId
     * @param postQuery
     * @returns {Promise<Object>}
     */
    @HttpCode(httpCode.OK)
    @Get('/title/:title')
    public async getPost(@Param('title') title: string, @Ctx() ctx: IAppContext) {
        let query = PostModel.find({
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
        }

        return query
    }
}

