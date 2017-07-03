/**
 * Created by haozi on 2017/07/02.
 */

import {IPost, PostModel} from "../models"

/**
 * proxy PostModel
 */
export default class Post {
    private $post: IPost
    private cache: IPost
    private lastCache: Date


    private get post() {
        if (this.$post) {
            if (this.lastCache.getTime() !< this.lastCache.getTime() + 60 * 1000) {
                // 异步调用获取最新

            }
            return this.$post


        } else {
            throw new Error('post is null')
        }
    }
    private set post(post: IPost) {
        this.$post = post
    }

    /**
     * 构造函数
     * @param post
     * @constructor
     */
    public constructor(post?: IPost) {
        if (post) {
            this.setPost(post)
        }
    }

    /**
     * 设置  Post 对象
     * @param post
     */
    public setPost(post: IPost) {
        this.post = post
    }


    /**
     * 使用
     * @param postId
     * @returns {Promise<IPost>}
     */
    public static async findByPostId(postId: string):  Promise<IPost> {
        return await PostModel.findOne({
            postId
        })
    }

    public async findByPostId(postId: string): Promise<Boolean> {
        try {
            this.setPost(await Post.findByPostId(postId))
            return true
        } catch (e) {
            return false
        }
    }

    /**
     * 使用自定义的查询语句
     * @param query
     * @returns {Promise<IPost[]>}
     */
    public static async findByQuery(query: any): Promise<IPost> {
        return await PostModel.findOne(query)
    }

    public async findByQuery(query: any): Promise<Boolean> {
        try {
            this.setPost(await Post.findByQuery(query))
            return true
        } catch (e) {
            return false
        }
    }

    public static async findByTag() {
        //todo 暂时不做
    }

    /**
     * 设置 flag
     * @param post
     * @param flag
     * @returns {Promise<void>}
     */
    public static async setShow(post: IPost, flag: boolean) {
        post.isShow = flag
        await post.save()
    }

    public async setShow(flag: boolean) {
        await Post.setShow(this.post, flag)
    }
}
