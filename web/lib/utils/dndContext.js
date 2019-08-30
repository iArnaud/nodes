import { DragDropContext } from 'react-dnd-cjs'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend-cjs'
import get from 'lodash/get'

const PatchedHTML5Backend = (manager) => {
  // NOTE: HTML5Backend NativeTypes.URL does not expose html so we can parse link title nor dataTransfer object, so patch.
  const backend = HTML5Backend(manager)
  const orgTopDropCapture = backend.handleTopDropCapture
  backend.handleTopDropCapture = (e) => {
    orgTopDropCapture.call(backend, e)
    if (get(backend, 'currentNativeSource.item')) {
      const item = backend.currentNativeSource.item
      backend.currentNativeSource.item.dataTransfer = e.dataTransfer
      let type = NativeTypes.TEXT
      if (item.urls) {
        type = NativeTypes.URL
      } else if (item.text && item.text.startsWith('http')) {
        type = NativeTypes.URL
        backend.currentNativeSource.item.urls = [item.text]
      } else if (item.files || item.items) {
        type = NativeTypes.FILE
      }
      backend.currentNativeSource.item.type = type
    }
  }
  return backend
}

const dndContext = DragDropContext(PatchedHTML5Backend)

export default dndContext
