// import { Editor } from 'slate-react'
import { Value } from 'slate'

import createRenderAnnotation from './renderAnnotation'

export default ({ React, Box }) => {
  const { Editor } = require('slate-react')
  const { renderAnnotation, ANNOTATION_TYPES } = createRenderAnnotation({ React, Box })
  const RichTextEditor = React.forwardRef((props, ref) => (
    <Editor ref={ref} {...props} renderAnnotation={renderAnnotation} />
  ))

  return { RichTextEditor, Value, ANNOTATION_TYPES }
}
