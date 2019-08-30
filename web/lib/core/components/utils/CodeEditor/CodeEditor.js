import React from 'react'
import './CodeEditor.css'
import throttle from 'lodash/throttle'
import Editor from 'react-simple-code-editor'
import Prism from 'prismjs'
import 'prismjs/themes/prism-funky.css'

export default ({ value, onChange, options = { language: 'javascript', size: 'medium' } }) => {
  const { language, size } = options
  const _onChange = onChange ? throttle(onChange, 10) : () => {}
  const [code, setCode] = React.useState(value)
  return (
    <Editor
      value={code}
      onValueChange={newCode => {
        setCode(newCode)
        _onChange(newCode)
      }}
      highlight={code => language ? Prism.highlight(code, Prism.languages[language], language) : code}
      padding={10}
      style={{
        width: '100%',
        height: '100%',
        // fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: size === 'small' ? 12 : 16,
        overflow: 'scroll'
      }}
    />
  )
}
