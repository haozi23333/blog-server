/**
 * Created by haozi on 2017/06/03.
 */

import {appModel, IApp} from "../database/schemas/app"
import {Posts} from '../api/post/posts'
import {IPost} from "../database/schemas/post";

class App {
    app: IApp
    posts: Posts
    constructor() {

    }
    public getAllPost() {
        return this.posts.getPosts()
    }
    public getApp() {
        return this.app
    }
    public setApp(app: IApp): this{
        this.app = app
        return this
    }
    public getPosts() {
        return this.posts
    }
    public async waitLoad() {
        try {
            const posts = new Posts()
            await posts.loadData()
            this.posts = posts
            console.log(`posts -> 加载完成 共加载 ${posts.getPosts().length} 篇`)
            console.log(`users -> 加载完成 共加载 ${1} 个人`)
        }catch (e){
            throw e
        }
    }
}

/**
 * 获取 App 实例
 * @returns {App}
 */
function getApp():App {
    if(!(global as any).App) {
        (global as any).App = new App
    }
    return (global as any).App
}

export {
    App,
    getApp
}
