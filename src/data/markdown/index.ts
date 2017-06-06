/**
 * Created by haozi on 6/5/2017.
 */
import Showdown = require('showdown-ghost')
// import {image} from './extensions/image'
// console.log(image)
const converterPreview =  new Showdown.converter({
  extensions: ['table', require('./extensions/image')]
})
const converterHTML =  new Showdown.converter({
  extensions: [require('./extensions/image'), 'table']
})

export function markdownToEditorPreviewHTML(markdown: string) {
  return converterPreview.makeHtml(markdown)
}

export function markdownToHTML(markdown: string) {
  return converterHTML.makeHtml(markdown)
}
