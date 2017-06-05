/**
 * Created by haozi on 6/5/2017.
 */
import Showdown = require('showdown-ghost')

const converterPreview =  new Showdown.converter({
  extensions: ['table']
})
const converterHTML =  new Showdown.converter({
  extensions: ['table']
})

export function markdownToEditorPreviewHTML(markdown: string) {
  return converterPreview.makeHtml(markdown)
}

export function markdownToHTML(markdown: string) {
  return converterHTML.makeHtml(markdown)
}
