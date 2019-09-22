export const login = ({ backend, cache }) => async (login, password) => {
  if (login) cache.clear()
  return backend.login(login, password)
}

export const logout = ({ backend, cache }) => async () => {
  cache.clear()
  return backend.logout()
}

export const setToken = ({ backend, cache }) => token => {
  if (backend.token && token && token !== backend.token) {
    cache.delete('user')
  }
  return backend.setToken(token)
}

export const getToken = ({ backend }) => () => backend.getToken()
