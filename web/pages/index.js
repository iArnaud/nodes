import React from 'react'
import { dark } from 'grommet/themes'

import { Page, Loading, dndContext, Hotkeys, usePageState } from '../lib/utils'
import Spinner from '../lib/core/components/utils/Spinner'

import { NodeView, NodeSEO } from '../lib/core/components/node'

import initNApi from '../lib/core/napi'
import OfflineBackend from '../lib/backends/offline'
import config from '../lib/config'
import nodes from '../lib/nodes'

const napi = initNApi({ backend: new OfflineBackend({ nodes }), env: config })

if (typeof window !== 'undefined') window.napi = napi

const IndexPage = () => {
  const { node, view, viewer } = usePageState(napi)
  if (!node) {
    return (
      <Page theme={dark}>
        <Loading indicator={<Spinner />} />
      </Page>
    )
  }
  return (
    <Page theme={dark}>
      <Hotkeys node={node} view={view} napi={napi} viewer={viewer} />
      <NodeSEO node={node} />
      <NodeView node={node} view={view} napi={napi} viewer={viewer} />
    </Page>
  )
}

export default dndContext(IndexPage)
