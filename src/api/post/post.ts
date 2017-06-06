/**
 * Created by haozi on 2017/06/03.
 */
import {ICommit, IPost, postModel} from '../../database/schemas/post'
import {getApp} from "../app"
import {assign} from 'lodash'
import {User} from "../users/user"
import md5 = require("md5")
import {commitModel} from "../../database/index"
import {markdownToHTML} from "../../data/markdown/index"

class Post {
    constructor(post: IPost) {
        this.setPost(post)
    }

    private post: IPost = null

    public setPost(post: IPost): this {
        this.post = post
        return this
    }

    public getPost(): IPost {
        return this.post
    }
    /**
     * 删除
     * @returns {Promise<void>}
     */
    public async delete() {
        await this.post.remove()
        delete this.post
        getApp().getPosts().clearUndefined()
    }

    /**
     * 发布
     * @returns {Promise<void>}
     */
    public async publish(user: User) {
        await this.setPrototype({
            publish: true
        }, user)
    }

    /**
     * 取消发布状态
     * @returns {Promise<void>}
     */
    public async unPublish(user: User) {
        await this.setPrototype({
            publish: false
        }, user)
    }

    public getAllCommit(): ICommit[] {
        // todo coomit 系统
        return this.getPost().commits
    }

    /**
     *  通过ID获取commit
     * @param id
     * @returns {any}
     */
    public getCommitById(id: string): ICommit {
        for (let i = 0; i < this.getAllCommit().length; i++) {
            if (this.getAllCommit()[i].id === id) {
                return this.getAllCommit()[i]
            }
        }
        return null
    }

    /**
     *  通过ID获取commit
     * @param id
     * @returns {any}
     */
    public getCommitByHash(hash: string): ICommit {
        for (let i = 0; i < this.getAllCommit().length; i++) {
            if (this.getAllCommit()[i].hash === hash) {
                return this.getAllCommit()[i]
            }
        }
        return null
    }
    public getCommitByHashid(hash: string): ICommit {
        const key = hash.length === 7 ? 'id' : 'hash'
        for (let i = 0; i < this.getAllCommit().length; i++) {
            if (this.getAllCommit()[i][key] === hash) {
                return this.getAllCommit()[i]
            }
        }
        return null
    }

    public async deleteCommitByHash(hash: string) {
        for (let i = 0; i < this.getAllCommit().length; i++) {
            if (this.getAllCommit()[i].hash === hash) {
                this.getPost().commits.splice(i, 1)
                await this.save()
            }
        }
    }

    public async createCommit(message: string, markdown: string) {
        const hash = this.getMD5(markdown)
        const newCommit = new commitModel({
            id: hash.slice(0, 7),
            hash,
            message,
            markdown,
            date: new Date()
        })
        this.getPost().commits.push(newCommit)
        await this.save()
        return hash
    }

    /**
     * 合并对象 qwq
     * @param obj
     * @returns {Promise<void>}
     */
    public async setPrototype(obj: any, user: User): Promise<this> {
        obj = obj as IPost
        // todo 重新处理一下 publish 的问题
        (obj as IPost).updateDate = new Date();
        (obj as IPost).updateBy = user.getUser().name
        if ((obj as IPost).markdown) {
            (obj as IPost).html = this.getHtml((obj as IPost).markdown);
            (obj as IPost).excerpt = this.getHtml(this.getExcerpt((obj as IPost).markdown))
        }
        // todo 合并貌似不能这么简单吧
        assign(this.getPost(), obj)
        await this.save()
        return this
    }

    /**
     * this.post.save
     * @returns {Promise<void>}
     */
    public async save() {
        await this.post.save()
    }

    public toObject() {
        const postData = this.getPost().toObject() as IPost
        delete postData.commits
        delete postData._id
        return postData
    }

    /**
     * 获取md5
     * @param data
     * @returns {string}
     */
    public getMD5(data: string) {
        return md5(data)
    }

    /**
     * 转换Html
     * @param markdown
     * @returns {any}
     */
    public getHtml(markdown: string) {
        return markdownToHTML(markdown)
    }

    /**
     * 获取摘要
     * @param str
     * @returns {string}
     */
    public getExcerpt(str: string) {
        const excerptRegEx = /<==\s*more\s*==>/
        if ( excerptRegEx.test(str)) {
            return str.replace(excerptRegEx, (match: string, index: number) => {
                return str.substring(0, index).trim()
            })
        } else {
            if (str.length < 300) {
                return str
            }
        }
        return '你是不是忘记写more了'
    }
}

export {
    Post
}
