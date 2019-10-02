import generateSchema from './generate-schema'
import processFilesEvent, { newDirectoryApiAsync } from './processFilesEvent'
import clipboardCopy from 'clipboard-copy'

const elementFromHTML = html => {
  const template = document.createElement('template')
  html = html.trim()
  template.innerHTML = html
  return template.content.firstChild
}

export { generateSchema, elementFromHTML, processFilesEvent, newDirectoryApiAsync, clipboardCopy }
