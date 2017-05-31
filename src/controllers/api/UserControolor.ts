/**
 * Created by haozi on 2017/05/28.
 */

import {Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers"

@Controller('/2')
export class UserControolor {
    @Get('/:id')
    public async id(@Param("id") id: string) {
        return `id -> ${id}`
    }

    @Get('/:id/posts')
    public getPosts(@Param('id') id: string) {
        return `get post for id -> ${id} `
    }

    @Get('/qwq/a')
    public qwq() {
        return `qwq`
    }
}
