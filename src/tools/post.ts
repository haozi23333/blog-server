/**
 * Created by haozi on 2017/07/04.
 */

import toMarkdown from '../data/markdown'

/**
 * 获取 html
 * @param markdown
 * @returns {String}
 */
export function getHtml(markdown: string) {
    const excerptRegExp = /<==\s*more\s*==>/
    return toMarkdown(markdown.replace(excerptRegExp, ''))
}

/**
 * 获取摘要
 * @param str
 * @returns {string}
 */
export function getExcerpt(str: string) {
    const excerptRegExp = /<==\s*more\s*==>/
    if (excerptRegExp.test(str))
        return str.split(excerptRegExp)[0]
    if (str.length < 500)
        return str
    return '你是不是忘记写more了'
}