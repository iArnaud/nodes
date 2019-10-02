import RemoteStorage from 'remotestoragejs'
import config from '../config'
const path = 'nodes'
const rs = new RemoteStorage()
rs.setApiKeys({
  googledrive: config.googleClientId,
  dropbox: config.dropboxClientId
})
rs.access.claim(path, 'rw')
rs.caching.enable(`/${path}/`)

export default rs
