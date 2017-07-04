/**
 * Created by haozi on 2017/07/04.
 */

import toMarkdown from '../data/markdown'

/**
 * 获取 html
 * @param markdown
 * @returns {String}
 */
export function  getHtml(markdown: string) {
    const excerptRegEx = /<==\s*more\s*==>/
    return toMarkdown(markdown.replace(excerptRegEx, ''))
}

/**
 * 获取摘要
 * @param str
 * @returns {string}
 */
export function getExcerpt(str: string) {
    const excerptRegEx = /<==\s*more\s*==>/
    if ( excerptRegEx.test(str)) {
        return str.split(excerptRegEx)[0]
    } else {
        if (str.length < 500) {
            return str
        }
    }
    return '你是不是忘记写more了'
}