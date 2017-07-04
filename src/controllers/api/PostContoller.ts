/**
 * Created by haozi on 5/31/2017.
 */
import {Controller, Param, Body, Get, Post, Put, Delete, HttpCode, ContentType} from "routing-controllers"
import {IAuthContext} from "../../interfaces/KoaContext"
import {Ctx} from "routing-controllers/decorator/Ctx"
import {UnauthorizedError} from "../../errors"
import {PostModel} from '../../models'
import {httpCode} from "../../httpCode"
import IPost from "../../models/interface/IPost";
import {AppModel} from "../../models/App";

@Controller('/api/post')
export default class PostContoller {
  /**
   * 生成一个新的Post
   * 返回生成的postId
   * @returns {Promise<string>}
   */
  @HttpCode(httpCode.CREATED)
  @Post('/')
  public async createPost(@Ctx() ctx: IAuthContext) {
    if (!ctx.user) {
      throw new UnauthorizedError('你没有权限修改')
    }
    const postId =  (await AppModel.findOneAndUpdate({ appName: 'blog'}, {$inc: {
      totalPosts: 1
    }}))
    const post = new PostModel({postId})
    return (await post.save()).toObject()
  }

  /**
   * 删除文章
   * @param postId
   * @param ctx
   * @returns {Promise<{message: string}>}
   */
  @HttpCode(httpCode.NOCONTENT)
  @Delete('/:postId')
  public async removePost(@Param('postId') postId: string, @Ctx() ctx: IAuthContext) {
    if (!ctx.user) {
      throw new UnauthorizedError('你没有权限修改')
    }
    await PostModel.remove({postId})
    return {
      message: 'ok'
    }
  }

  /**
   * 查询 post 信息
   * @param postId
   * @param postQuery
   * @returns {Promise<Object>}
   */
  @HttpCode(httpCode.OK)
  @Get('/:postId')
  @ContentType('application/json')
  public async getPost(@Param('postId') postId: string) {
    return (await PostModel.findOne({postId})).toObject()
  }

  /**
   * 更新post的信息
   * 返回新的post信息
   * @param postId
   * @returns {Promise<void>}
   */
  @HttpCode(httpCode.CREATED)
  @Put('/:postId')
  public async updatePost(@Param('postId') postId: string, @Ctx() ctx: IAuthContext, @Body() body: any) {
    if (!ctx.user) {
      throw new UnauthorizedError('你没有权限修改')
    }
    return (await PostModel.updateData(postId, (body as IPost))).toObject()
  }
}
