import createEditor from './Editor'
export default async ({ __deps__, __imports__ }) => {
  const { Box } = __imports__.grommet
  const { React, lodash: _, icons } = __imports__.utils
  const { napi, iconSize, viewer } = __deps__

  const Editor = createEditor({ React, Box })

  function getRandomColor () {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  const defaultContent = {
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              text: 'Note'
            }
          ]
        }
      ]
    }
  }
  const save = async (node, change) => {
    await napi.updateNodeSide(node, 'note/content', change.value.toJSON())
  }
  const debouncedSave = _.debounce(save, 500)

  const _view = ({ size }) => ({ node }) => {
    const content = Editor.Value.fromJSON(_.get(node, 'sides.note.content', defaultContent))
    const background = _.get(node.sides, 'note.background') || { color: 'black', opacity: 'medium' }
    const [value, setValue] = React.useState(content)
    const emptySync = { operations: [], annotations: [], value: null }
    const [sync, setSync] = React.useState(emptySync)
    const editorRef = React.useRef(null)
    const colorRef = React.useRef(getRandomColor())

    const handleChange = async change => {
      setValue(change.value)
      if (sync.operations.length || sync.annotations.length) {
        setSync(emptySync)
      } else {
        emitChange(change)
      }
      if (change.value.document !== value.document) {
        debouncedSave.cancel()
        debouncedSave(node, change)
      }
    }

    const emitChange = change => {
      const value = change.value.toJSON({ preserveSelection: true })
      // const key = napi.socket.id
      const key = viewer.id
      const { anchor, focus } = value.selection
      napi.emitNodeSideEvent(node, 'note', 'change', {
        value,
        operations: change.operations,
        annotations: [{ key, anchor, focus, data: { name: viewer.name, color: colorRef.current } }]
      })
    }

    const syncEditor = ({ operations = [], annotations = [] }) => {
      if (operations.length) {
        editorRef.current.withoutSaving(() => {
          operations.filter(op => op.type !== 'set_selection').forEach(op => {
            editorRef.current.applyOperation(op)
          })
        })
      }

      // Update all annotations
      editorRef.current.value.annotations.forEach(annotation => {
        if (annotation.type === Editor.ANNOTATION_TYPES.cursor) {
          editorRef.current.removeAnnotation(annotation)
        }
      })
      const documentKey = editorRef.current.value.document.key
      annotations.forEach(annotation => {
        // Skip this client's annotation
        // if (annotation.key === napi.socket.id) return
        if (annotation.key === viewer.id) return

        // Update the annotation key to match the client's document key
        annotation.anchor.key = documentKey
        annotation.focus.key = documentKey

        editorRef.current.addAnnotation({
          ...annotation,
          type: Editor.ANNOTATION_TYPES.cursor
        })
      })
    }

    const handleRemoteChange = ({ operations, annotations, value }) => {
      console.log('remote change', operations)
      console.log('editor', editorRef.current)
      setSync({ operations, annotations, value })
    }

    React.useEffect(() => {
      napi.subscribeToNodeSideEvent(node, 'note', 'change', handleRemoteChange)
      return () => {
        napi.unsubscribeFromNodeSideEvent(node, 'note', 'change', handleRemoteChange)
      }
    }, [])

    React.useEffect(() => {
      if (sync.operations.length || sync.annotations.length) {
        syncEditor(sync)
      }
    }, [sync])

    return (
      <Box fill align='center' justify='center' pad='small' >
        <Box fill align='center' justify='center' round='small' background={background} overflow='scroll' >
          <Box fill align='start' justify='start' pad='small'>
            <Editor.RichTextEditor ref={editorRef} value={value} onChange={handleChange} />
          </Box>
        </Box>
      </Box>
    )
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Note size={iconSize} /></Box>
  const preview = _view({ size: 'small' })
  const view = _view({ size: 'medium' })
  const edit = view

  return {
    modes: {
      icon,
      preview,
      view,
      edit
    }
  }
}
