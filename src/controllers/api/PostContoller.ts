/**
 * Created by haozi on 5/31/2017.
 */
import {Controller, Param, Body, Get, Post, Put, Delete, HttpCode, ContentType, UseInterceptor} from "routing-controllers"
import {IAuthContext} from "../../interfaces/KoaContext"
import {Ctx} from "routing-controllers/decorator/Ctx"
import {UnauthorizedError} from "../../errors"
import {PostModel} from '../../models'
import {httpCode} from "../../httpCode"
import IPost from "../../models/interface/IPost"
import {AppModel} from "../../models/App"
import {InvaidRequestError} from "../../errors/InvaidRequestError"
import MongoInterceptor from "../../intercept/MongoInterceptor"

@Controller('/api/post')
export default class PostContoller {
  /**
   * 生成一个新的Post
   * 返回生成的postId
   * @returns {Promise<string>}
   */
  @HttpCode(httpCode.CREATED)
  @UseInterceptor(MongoInterceptor)
  @Post('/')
  public async createPost(@Ctx() ctx: IAuthContext) {
    if (!ctx.user) {
      throw new UnauthorizedError('你没有权限修改')
    }
    const app = await AppModel.findOne({
      appName: 'blog'
    })
    const post = new PostModel({
      postId: app.nowPostId + 1,
      createBy: ctx.user.name
    })
    await post.save()
    app.nowPostId += 1
    await app.save()
    return post
  }

  /**
   * 删除文章
   * @param postId
   * @param ctx
   * @returns {Promise<{message: string}>}
   */
  @HttpCode(httpCode.NOCONTENT)
  @UseInterceptor(MongoInterceptor)
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
  @UseInterceptor(MongoInterceptor)
  @Get('/:postId')
  @ContentType('application/json')
  public async getPost(@Param('postId') postId: string) {
    return (await PostModel.findOne({postId}))
  }

  /**
   * 更新post的信息
   * @param postId
   * @param ctx
   * @param body
   * @returns {Promise<IPost>}
   */
  @HttpCode(httpCode.CREATED)
  @UseInterceptor(MongoInterceptor)
  @Put('/:postId')
  public async updatePost(@Param('postId') postId: string, @Ctx() ctx: IAuthContext, @Body() body: any) {
    if (!ctx.user) {
      throw new UnauthorizedError('你没有权限修改')
    }
    const {ok} = await PostModel.updateData(postId, (body) as IPost)
    if (ok === 1) {
      return await PostModel.findOne({postId})
    } else {
      throw new InvaidRequestError('并没有完成修改')
    }
  }
}
