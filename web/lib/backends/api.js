import axios from 'axios'
import cookie from 'js-cookie'

import BaseBackend from './base'

class APIBackend extends BaseBackend {
  constructor ({ http, baseURL }) {
    super()
    const self = this
    self.http = http || axios.create({ baseURL })
    self.http.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          const token = cookie.get('token')
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }
        return config
      },
      error => Promise.reject(error)
    )
    self.http.interceptors.response.use(response => response, error => {
      if (error.response && error.response.status === 401) {
        cookie.remove('token')
      }
      return Promise.reject(error)
    })
  }

  async create (node) { return (await this.http.post('/nodes', node)).data }
  async retrieve (nodeId) { return (await this.http.get(`/nodes/${nodeId}`)).data }
  async update (nodeId, update) { return (await this.http.patch(`/nodes/${nodeId}`, update)).data }
  async delete (nodeId) { return (await this.http.delete(`/nodes/${nodeId}`)).data }
  async find (query) { return (await this.http.get('/nodes', { params: query })).data }
  async search (text) { return (await this.http.get('/nodes/search', { params: { q: text } })).data }
}

export default APIBackend
