import React from 'react'
import { dark } from 'grommet/themes'

import { Page, Loading, dndContext, Hotkeys, usePageState } from '../lib/utils'
import Spinner from '../lib/core/components/utils/Spinner'

import { NodeView, NodeSEO } from '../lib/core/components/node'

import initNApi from '../lib/core/napi'
import OfflineBackend from '../lib/backends/offline'
import config from '../lib/config'
const PLUGINS_BASE_URL = process.env.PLUGINS_BASE_URL || '/static/plugins'
const genCorePluginNodes = names => names.map((name, i) => ({ status: 'ok', id: `core-${name}`, parentId: 'plugins', name, sides: { plugin: { canAdd: ['plugin'].includes(name), url: `${PLUGINS_BASE_URL}/core/${name}/index.bundled.js` } } }))
// const genCorePluginNodes = names => names.map((name, i) => ({ status: 'ok', id: `core-${name}`, parentId: 'plugins', name, sides: { plugin: { canAdd: ['plugin'].includes(name), url: `http://localhost:3030/core/${name}/pkg/dist-web/index.bundled.js` } } }))
const genCommonPluginNodes = names => names.map((name, i) => ({ status: 'ok', id: `common-${name}`, parentId: 'plugins', name, sides: { plugin: { canAdd: true, url: `${PLUGINS_BASE_URL}/common/${name}/index.bundled.js` } } }))
const nodes = [
  { status: 'ok', id: 'nodes-ws', name: 'Nodes WebOS', sides: { desktop: true } },
  { status: 'ok', parentId: 'nodes-ws', id: 'users', name: 'Users', sides: { desktop: true } },
  { status: 'ok', parentId: 'nodes-ws', id: 'plugins', name: 'Plugins', sides: { desktop: true } },
  ...genCorePluginNodes(['ui', 'json', 'user', 'users', 'settings', 'search', 'side', 'node', 'login', 'error', 'remove', 'desktop', 'plugin', 'import', 'export', 'merge', 'nstore']),
  ...genCommonPluginNodes(['link', 'note'])
]

const backend = new OfflineBackend({ nodes })
const napi = initNApi({ backend, env: config })

if (typeof window !== 'undefined' && window.Cypress) window.napi = napi // NOTE: cypress

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
      <NodeView
        node={node}
        view={view}
        napi={napi}
        viewer={viewer}
      />
    </Page>
  )
}

export default dndContext(IndexPage)
