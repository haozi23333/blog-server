/**
 * Created by haozi on 2017/07/03.
 */

import {IPost, PostModel} from "./models";


export default class Posts {
    private $posts: IPost[]

    private get posts() {
        if (this.$posts) {
            return this.$posts
        } else {
            throw new Error('posts is null')
        }
    }
    private set posts(post: IPost[]) {
        this.$posts = post
    }

    private setPosts(posts: IPost[]) {
        this.posts = posts
    }

    public static async findAll(query: any = {}, limit:number = 10): Promise<IPost[]> {
        return await PostModel.find(query).limit(limit)
    }

    public async findAll(query: any = {}, limit:number = 10) {
        this.setPosts(await Posts.findAll(query, limit))
    }

}
