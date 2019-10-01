import React from 'react'
import Widget from 'remotestorage-widget'
import { Box, Button } from 'grommet'
import { Wifi } from 'grommet-icons'

const parentId = 'remotestorage-widget'

const Toggler = ({ clickHandler, status }) => (
  <Box pad='xsmall' align='center' justify='center'>
    <Button plain icon={<Wifi color={`status-${status}`} />} onClick={clickHandler} />
  </Box>
)

export default ({ remotestorage }) => {
  const [widget, setWidget] = React.useState()
  const [open, setOpen] = React.useState()
  // const [status, setStatus] = React.useState('disabled')
  const [status, setStatus] = React.useState(remotestorage.connected ? 'ok' : 'warning')
  React.useEffect(() => {
    remotestorage.on('network-offline', () => {
      setStatus('disabled')
    })
    remotestorage.on('connected', () => {
      setStatus('ok')
    })
    remotestorage.on('disconnected', () => {
      setStatus('warning')
    })
    remotestorage.on('error', () => {
      setStatus('error')
    })
    remotestorage.on('network-online', () => {
      setStatus('ok')
    })
  }, [])
  React.useEffect(() => {
    const _widget = new Widget(remotestorage, { skipInitial: true, backdropModal: false, leaveOpen: true })
    setWidget(_widget)
  }, [])
  React.useEffect(() => {
    if (open && widget) widget.attach(parentId)
  }, [open, widget])
  const clickHandler = () => {
    setOpen(!open)
  }
  return (
    <Box style={{ position: 'fixed', bottom: '10px', left: '10px', right: open ? '10px' : null }}>
      {open && (
        <Box round='xsmall' width='medium' height='medium' justify='between' background={{ color: 'black', opacity: 'strong' }}>
          <Box pad='small' align='center' id={parentId} style={{ position: 'relative' }} />
          <Box fill='horizontal' align='start'><Toggler status={status} clickHandler={clickHandler} /></Box>
        </Box>
      )}
      {!open && <Box round='xsmall' background={{ color: `status-${status}`, opacity: 'medium' }}><Toggler status={status} clickHandler={clickHandler} /></Box>}
    </Box>
  )
}
