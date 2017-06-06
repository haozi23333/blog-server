/**
 * Created by haozi on 6/6/2017.
 */

module.exports = () => {
  return [
    {
      type: 'lang',
      filter: (text: string) => {
        const imageMarkdownRegex = /^(?:\{(.*?)\})?!(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?$/gim
        // const imageMarkdownRegex = /(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/gim
        return text.replace(imageMarkdownRegex, (match, key, alt, src) => {
          let isBigPic = false
          console.log('key -> ' + key)
          console.log('alt -> ' + alt)
          console.log('src -> ' + src)
          if (alt) {
            isBigPic = alt.split('@').pop()
            if (isBigPic) {
              if (String(isBigPic) === 'small') {
                isBigPic = false
              } else {
                isBigPic = true
              }
            }
          }
          if (src) {
            if (src.indexOf(".pdf") === src.length - 4) {
              return '<object data="' + src + '" type="application/pdf" width="100%" height="100%">' + alt + '</object>'
            }
            return `<img src="${src}" alt="${alt}" ${isBigPic ? 'big' : 'small'} />`
          }
          return ''
        })
      }
    },
    {
      type: 'lang',
      /**
       * checkbox的滋瓷
       * @param text
       */
      filter: (text) => {
        const checkBoxRegex = /\[(X+|\s)\]\s(.+)/igm
        return text.replace(checkBoxRegex, (str, isCheck, value, index) => {
          return "<p><input disabled type='checkbox' " + (isCheck.toLowerCase() === "x" ? "checked" : "") + "/>" + value + "</p>"
        })
      }
    }
  ]
}
