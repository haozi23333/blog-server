/**
 * Created by haozi on 5/31/2017.
 */
import {Controller, Param, Body, Get, Post, Put, Delete, HttpCode } from "routing-controllers"
import {IAuthContext} from "../../interfaces/KoaContext"
import {Ctx} from "routing-controllers/decorator/Ctx"
// import {Posts} from "../../api/post/posts"
import {UnauthorizedError} from "../../errors/UnauthorizedError"
// import {getApp} from "../../api/app"
import {NotFoundError} from "../../errors/NotFoundError"
import {IPost, PostModel} from '../../models'
import {default as _Postapi} from '../../api/Post'

@Controller('/api/post')
export default class PostContoller {
  /**
   * 生成一个新的Post
   * 返回生成的postId
   * @returns {Promise<string>}
   */
  @HttpCode(201)
  @Post('/')
  public async createPost(@Ctx() ctx: IAuthContext) {
    if (!ctx.user) {
      throw new UnauthorizedError('你没有权限修改')
    }
    const post = new PostModel({
      po
    })
  }

  /**
   * 删除文章
   * @param postId
   * @param ctx
   * @returns {Promise<{message: string}>}
   */
  @HttpCode(204)
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
   * 获取一个post的详细信息
   *
   * @param postId
   * @returns {Promise<void>}
   */
  @HttpCode(200)
  @Get('/:postId')
  public async getPost(@Param('postId') postId: string) {
    const post =  await getApp().getPosts().findById(postId)
    if (!post) {
      throw new NotFoundError(`这个id -> ${postId} 的post不存在`)
    }
    return post.toObject()
  }
  /**
   * 更新post的信息
   * 返回新的post信息
   * @param postId
   * @returns {Promise<void>}
   */
  @HttpCode(201)
  @Put('/:postId')
  public async updatePost(@Param('postId') postId: string, @Ctx() ctx: IAuthContext, @Body() body: any) {
    if (!ctx.user) {
      throw new UnauthorizedError('你没有权限修改')
    }
    if (!getApp().getPosts().findById(postId)) {
      throw new NotFoundError(`没有找到 id 为${postId} 的文章`)
    }
    const post = await getApp().getPosts().findById(postId).setPrototype(body, ctx.user)
    return post.toObject()
  }
}
