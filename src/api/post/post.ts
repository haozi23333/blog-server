/**
 * Created by haozi on 2017/06/03.
 */
import {IPost, postModel} from '../../database/schemas/post'
import {getApp} from "../app"
import {assign} from 'lodash'

class Post {
    private isNew: boolean = false

    constructor(post: IPost) {
        this.setPost(post)
    }

    get post(): IPost {
        if(this.isNew) {
            return this._post
        } else {
            return getApp().getPosts().findById(this._post._id)
        }
    }

    set post(value: IPost) {
        this._post = value
    }
    private _post: IPost = null

    public setPost(post: IPost): this {
        this._post = post
        return this
    }

    public async createPost(createUser: string) {
        // todo 等等在写
        this._post = new postModel({
            postId: (getApp().getPosts().getAll().length + 1).toString(),
            ref: '',
            title: '',
            tags: [],
            image: '',
            markdown: '',
            html: '',
            publish: false,
            createDate: new Date(),
            createBy: createUser,
            updateDate: Date,
            updateBy: null,
            publishDate: null,
            publishBy: '',
            commits: [],
        })
        try{
            await this.save()
        } catch (e) {
            throw e
        }
    }

    /**
     * 删除
     * @returns {Promise<void>}
     */
    public async delete() {
        try{
            await this.post.remove()
            delete this.post
            getApp().getPosts().clearUndefined()
        } catch (e) {
            throw e
        }
    }

    /**
     * 发布
     * @returns {Promise<void>}
     */
    public async publish() {
        try {
            this.setPrototype({
                publish: true
            })
        } catch (e) {
            throw e
        }
    }

    /**
     * 取消发布状态
     * @returns {Promise<void>}
     */
    public async unPublish() {
        try {
            this.setPrototype({
                publish: false
            })
        } catch (e) {
            throw e
        }
    }

    public async getAllCommit() {
        // todo coomit 系统
    }

    /**
     * 合并对象 qwq
     * @param obj
     * @returns {Promise<void>}
     */
    public async setPrototype(obj: any) {
        try {
            assign(this.post, obj)
            await this.save()
        } catch (e) {
            throw e
        }
    }


    /**
     * this.post.save
     * @returns {Promise<void>}
     */
    public async save() {
        try{
            this.isNew = false
            await this.post.save()
        } catch (e) {
            throw e
        }
    }


}

export {
    Post
}
