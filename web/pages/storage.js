import React from 'react'
import '../lib/utils/empty.css' // FIXME: workaroung to fix next.js routing bug https://github.com/zeit/next-plugins/issues/282
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
      console.log('CONNECTED')
      router.push('/app')
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
