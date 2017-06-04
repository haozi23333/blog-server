/**
 * Created by haozi on 5/31/2017.
 */
import {Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers"
import {postModel, commitModel} from '../../database/schemas/post'
import * as md5 from 'md5'
import {IAppContext} from "../../interfaces/KoaContext"
import {Ctx} from "routing-controllers/decorator/Ctx"

@Controller('/api/posts')
export class Posts {
  /**
   * 生成一个新的Post
   * 返回生成的postId
   * @returns {Promise<string>}
   */
  @Post('/')
  public async createPost(@Ctx() ctx: IAppContext) {
    return `ip -> ${ctx.realIp}`
  }

  /**
   * 获取一个post的详细信息
   *
   * @param postId
   * @returns {Promise<void>}
   */
  @Get('/:postId')
  public async getPost(@Param('postId') postId: string) {
      return postId
  }
  /**
   * 更新post的信息
   * 返回新的post信息
   * @param postId
   * @returns {Promise<void>}
   */
  @Put('/:postId')
  public async updatePost(@Param('postId') postId: string) {
    return 1
  }
  /**
   * 获取 post的全部commit
   * @returns {Promise<void>}
   */
  @Get('/:postId/commits')
  public async commits() {

  }

  /**
   * 获取post的单条commit by hash
   * @returns {Promise<void>}
   */
  @Get('/:postId/commits/:hash')
  public async getCommitsByHash() {

  }

  /**
   * 删除post的单条commit记录 by hash
   * @returns {Promise<void>}
   */
  @Delete('/:postId/commits/:hash')
  public async deleteCommitsByHash() {

  }
}
