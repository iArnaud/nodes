import React from 'react'
import { Page, remotestorage } from '../lib/utils'
import { Box } from 'grommet'
import { useRouter } from 'next/router'
const parentId = 'remotestorage-widget-custom'

const Storage = ({ remotestorage }) => {
  const router = useRouter()
  React.useEffect(() => {
    const Widget = require('remotestorage-widget')
    const widget = new Widget(remotestorage, { skipInitial: true, backdropModal: false, leaveOpen: true })
    widget.attach(parentId)
  }, [])

  React.useEffect(() => {
    remotestorage.on('connected', () => {
      console.log('CONNECTED', router)
      // window.location.href = '/app2'
      router.push('/app2')
    })
  })
  return (
    <Box height='100vh' width='100vw'>
      <Box align='center' justify='center' fill>
        <Box align='center' justify='center' id={parentId} />
      </Box>
    </Box>
  )
}

export default () => {
  return (
    <Page>
      <Storage remotestorage={remotestorage} />
    </Page>
  )
}
