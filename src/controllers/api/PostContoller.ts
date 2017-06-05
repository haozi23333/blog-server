/**
 * Created by haozi on 5/31/2017.
 */
import {Controller, Param, Body, Get, Post, Put, Delete, HttpCode } from "routing-controllers"
import {IAuthContext} from "../../interfaces/KoaContext"
import {Ctx} from "routing-controllers/decorator/Ctx"
import {Posts} from "../../api/post/posts"
import {httpCode} from "../../httpCode"
import {UnauthorizedError} from "../../errors/UnauthorizedError"
import {getApp} from "../../api/app"
import {NotFoundError} from "../../errors/NotFoundError"
import {InvaidRequestError} from "../../errors/InvaidRequestError"
import {ValidatorCreateCommit} from "../validation/api/post"

@Controller('/api/posts')
export class PostContoller {
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
    const posts = new Posts()
    return {
      httpCode: httpCode.CREATED,
      data: {
        postId: await posts.create(ctx.user.getUser().name)
      }
    }
  }
  @Get('/')
  public async getAllPost(@Ctx() ctx: IAuthContext) {
    return getApp().getPosts().toPostList()
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
    const post = await getApp().getPosts().findById(postId).setPrototype(body, ctx.user)
    return post.toObject()
  }
  /**
   * 获取 post的全部commit
   * @returns {Promise<void>}
   */
  @HttpCode(200)
  @Get('/:postId/commits')
  public async getAllCommits(@Param('postId') postId: string) {
    const post =  await getApp().getPosts().findById(postId)
    if (!post) {
      throw new NotFoundError(`这个id -> ${postId} 的post不存在`)
    }
    return post.getAllCommit()
  }

  /**
   * 创建一个新的 Commit
   * @returns {Promise<void>}
   */
  @HttpCode(201)
  @Put('/:postId/commits')
  public async CreateCommits(
    @Param('postId') postId: string,
    @Ctx() ctx: IAuthContext,
    @Body() body: ValidatorCreateCommit
  ) {
    if (!ctx.user) {
      throw new UnauthorizedError('没有权限')
    }
    const post =  await getApp().getPosts().findById(postId)
    if (!post) {
      throw new NotFoundError(`这个id -> ${postId} 的post不存在`)
    }
    const hash = await post.createCommit(body.message, body.markdown)
    return {
      hash
    }
  }

  /**
   * 获取post的单条commit by hash
   * @returns {Promise<void>}
   */
  @HttpCode(200)
  @Get('/:postId/commits/:hashid')
  public async getCommitsByHash(@Param('postId') postId: string, @Param('hashid') hashid: string) {
    const post =  await getApp().getPosts().findById(postId)
    if (!post) {
      throw new NotFoundError(`这个id -> ${postId} 的post不存在`)
    }
    if (hashid.length !== 7) {
      if (hashid.length !== 32) {
        throw new InvaidRequestError('hash的长度是7位或者32位')
      }
    }
    const commit = post.getCommitByHashid(hashid)
    if (!commit) {
      throw new NotFoundError(`编号为 ${postId} 的 ${hashid} 的记录不存在`)
    }
    return {
      httpCode: httpCode.OK,
      data: JSON.stringify(commit)
    }
  }

  /**
   * 删除post的单条commit记录 by hash
   * @returns {Promise<void>}
   */
  @HttpCode(204)
  @Delete('/:postId/commits/:hash')
  public async deleteCommitsByHash(@Param('postId') postId: string, @Param('hashid') hashid: string) {
    const post =  await getApp().getPosts().findById(postId)
    if (!post) {
      throw new NotFoundError(`这个id -> ${postId} 的post不存在`)
    }
    if (hashid.length !== 7) {
      if (hashid.length !== 32) {
        throw new InvaidRequestError('hash的长度是7位或者32位')
      }
    }
    const commit = post.getCommitByHashid(hashid)
    if (!commit) {
      throw new NotFoundError(`编号为 ${postId} 的 ${hashid} 的记录不存在`)
    }
    await post.deleteCommitByHash(commit.hash)
    return {
      httpCode: httpCode.NOCONTENT,
      message: `编号为 ${postId} 的 ${hashid} 的的commit已经被删除`
    }
  }
}
