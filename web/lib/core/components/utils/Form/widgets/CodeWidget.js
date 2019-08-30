import React from 'react'
import { Layer, Button, Box } from 'grommet'
import { Code } from 'grommet-icons'
import { PreviewEditor } from '../../CodeEditor'

const CodeWidget = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <React.Fragment>
      <Box fill align='center' justify='center'><Button plain label='Edit' icon={<Code />} onClick={() => setOpen(true)} /></Box>
      {open && <Layer>
        <Box fill overflow='scroll'>
          <PreviewEditor
            value={value}
            onCancel={() => setOpen(false)}
            onSave={value => onChange(value)}
            onSaveAndQuit={async value => {
              onChange(value)
              setOpen(false)
            }}
            options={{
              readOnly: false,
              mode: 'javascript'
            }}
          />
        </Box>
      </Layer>
      }
    </React.Fragment>
  )
}

export default CodeWidget
