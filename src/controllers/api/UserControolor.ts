/**
 * Created by haozi on 2017/05/28.
 */

import {Controller, Param, Body, Get, Post, Put, Delete,} from "routing-controllers"

@Controller('/users')
export class UserControolor {
    @Get('/:id')
    async id(@Param("id") id: string) {
        return `id -> ${id}`
    }

    @Get('/:id/posts')
    async getPosts(@Param('id') id: string) {
        return `get post for id -> ${id} `
    }

}
