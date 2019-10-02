import dynamic from 'next/dynamic'

import Page from './Page'
import Loading from './Loading'
import dndContext from './dndContext'
import Hotkeys from './Hotkeys'
import { usePageState } from './hooks'
import remotestorage from './remotestorage'

const RemotestorageWidget = dynamic(() => import('./RemotestorageWidget'), { ssr: false })

export { Page, Loading, dndContext, Hotkeys, usePageState, RemotestorageWidget, remotestorage }
