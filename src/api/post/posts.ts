/**
 * Created by haozi on 2017/06/03.
 */
import {IPost, postModel} from "../../database/schemas/post"
import {getApp} from "../app";


class Posts {
    private posts: IPost[] = []
    public getPosts() {
        return this.posts
    }
    public setPosts(posts: IPost[]) {
        this.posts = posts
    }

    async loadData() {
        try{
            this.setPosts(await postModel.find({}))
        } catch (e) {
            throw e
        }
    }

    public findById(id: string): IPost {
        // try {
        //     if(!Array.isArray(tag)){
        //         tag = [tag]
        //     }
        //     this.setPosts(await postModel.find({
        //         tags: {
        //             '$in': tag
        //         }
        //     }))
        // } catch (e) {
        // }
        for(let i = 0; i < this.getPosts().length; i ++){
            if(this.getPosts()[i]._id === id) {
                return this.getPosts()[i]
            }
        }
        return null
    }
    /**
     * 按照 tag 来查询
     * @param tag
     * @returns {Promise<void>}
     */
    public findByTag(tag: string) {
        // try {
        //     if(!Array.isArray(tag)){
        //         tag = [tag]
        //     }
        //     this.setPosts(await postModel.find({
        //         tags: {
        //             '$in': tag
        //         }
        //     }))
        // } catch (e) {
        // }
        return this.getPosts().filter((post: IPost) => {
            if(post.tags.indexOf(tag.toString())) {
                return post
            }
        })
    }

    /**
     * 按照  创建者查询
     * @param author
     * @returns {Promise<void>}
     */
    public findByAuthor(author: string) {
        // try {
        //     this.setPosts(await postModel.find({
        //         createBy: author
        //     }))
        // } catch (e) {
        //     throw e
        // }
        return this.getPosts().filter((post: IPost) => {
            if(post.createBy === author) {
                return post
            }
        })
    }

    /**
     * 按照 post 标题来查找
     * @param title
     * @returns {Promise<void>}
     */
    public findByTitle(title: string) {
        // try {
        //     this.setPosts(await postModel.find({
        //         title: title
        //     }))
        // } catch (e) {
        //     throw e
        // }
        return this.getPosts().filter((post: IPost) => {
            if(post.title === title) {
                return post
            }
        })
    }

    /**
     * 按照时间来查询 post
     * @param type 查询类型  create, publish, update
     * @param startTime 开始时间
     * @param endTime   结束时间
     * @returns {Promise<void>}
     */
    public findByTime(type: string, startTime: Date, endTime?: Date) {
        // try {
        //     if(!endTime)
        //         endTime = startTime
        //     const findOption= {}
        //     findOption[type + 'Date'] = {
        //         '$gte': startTime,
        //         '$lt': endTime
        //     }
        //     this.setPosts(await postModel.find(findOption))
        // } catch (e) {
        //     throw e
        // }
        return this.getPosts().filter((post: IPost) => {
            if(post.createDate >= startTime && post.createDate <= endTime){
                return post
            }
        })
    }

    public getAll() {
        return this.posts
    }
    public clearUndefined() {
        this.posts = this.posts.filter((v) => {
            if(v === undefined){
                return false
            }
            return true
        })
    }
    public async create() {
        try{

        } catch (e) {

        }
    }
}

export {
    Posts
}