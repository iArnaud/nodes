class SimpleCache {
  constructor (initial = {}) {
    this._cache = initial
  }

  toString () {
    return `Items: ${Object.keys(this._cache).length}.`
  }

  set (key, value) {
    this._cache[key] = value
    return value
  }

  get (key, value) {
    return this._cache[key]
  }

  delete (key) {
    delete this._cache[key]
  }

  clear () {
    this._cache = {}
  }
}

export default SimpleCache
