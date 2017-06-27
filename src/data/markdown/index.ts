/**
 * Created by haozi on 6/5/2017.
 */
// import remark from 'remark'
// import remarkHtml from 'remark-html'
// // import {image} from './extensions/image'
// // console.log(image)
//
// export function markdownToEditorPreviewHTML(markdown: string) {
//   return converterPreview.makeHtml(markdown)
// }
//
// export function markdownToHTML(markdown: string) {
//   return converterHTML.makeHtml(markdown)
// }

import remark = require('remark')
import remarkHtml = require('remark-html')
import qwq from 'remark-haozi-extend'

export default function toMarkdown(markdown) {
  return String(remark()
      .use(qwq)
      .use(remarkHtml)
      .processSync(markdown))
}