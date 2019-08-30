/*! uppie v1.1.1 | (c) silverwind | BSD license */
/* global FormData  */

// API implemented in Firefox 42+ and Edge
export async function newDirectoryApiAsync (input) {
  const opts = { name: 'files[]' }
  var fd = new FormData()
  var files = []
  var iterate = function (entries, path, resolve) {
    var promises = []
    entries.forEach(function (entry) {
      promises.push(new Promise(function (resolve) {
        if ('getFilesAndDirectories' in entry) {
          entry.getFilesAndDirectories().then(function (entries) {
            iterate(entries, entry.path + '/', resolve)
          })
        } else {
          if (entry.name) {
            var p = (path + entry.name).replace(/^[/\\]/, '')
            fd.append(opts.name, entry, p)
            files.push(p)
          }
          resolve()
        }
      }))
    })
    Promise.all(promises).then(resolve)
  }
  const entries = await input.getFilesAndDirectories()
  await Promise(function (resolve) {
    iterate(entries, '/', resolve)
  })
  return { formData: fd, files }
}

const processFilesEvent = (event, cb) => {
  const opts = { name: 'files[]' }
  const mode = event.dataTransfer ? 'dnd' : 'file'
  if (mode === 'dnd') {
    // event.preventDefault()
    var dt = event.dataTransfer
    if (dt.items && dt.items.length && 'webkitGetAsEntry' in dt.items[0]) {
      entriesApi(dt.items, opts, cb.bind(null, event))
    } else if ('getFilesAndDirectories' in dt) {
      newDirectoryApi(dt, opts, cb.bind(null, event))
    } else if (dt.files) {
      arrayApi(dt, opts, cb.bind(null, event))
    } else cb(event)
  } else {
    const t = event.target
    if (t.files && t.files.length) {
      arrayApi(t, opts, cb.bind(null, event))
    } else if ('getFilesAndDirectories' in t) {
      newDirectoryApi(t, opts, cb.bind(null, event))
    } else {
      cb(event)
    }
  }
}

// API implemented in Firefox 42+ and Edge
function newDirectoryApi (input, opts, cb) {
  var fd = new FormData()
  var files = []
  var iterate = function (entries, path, resolve) {
    var promises = []
    entries.forEach(function (entry) {
      promises.push(new Promise(function (resolve) {
        if ('getFilesAndDirectories' in entry) {
          entry.getFilesAndDirectories().then(function (entries) {
            iterate(entries, entry.path + '/', resolve)
          })
        } else {
          if (entry.name) {
            var p = (path + entry.name).replace(/^[/\\]/, '')
            fd.append(opts.name, entry, p)
            files.push(p)
          }
          resolve()
        }
      }))
    })
    Promise.all(promises).then(resolve)
  }
  input.getFilesAndDirectories().then(function (entries) {
    new Promise(function (resolve) {
      iterate(entries, '/', resolve)
    }).then(cb.bind(null, fd, files))
  })
}

// old prefixed API implemented in Chrome 11+ as well as array fallback
function arrayApi (input, opts, cb) {
  var fd = new FormData()
  var files = [];
  [].slice.call(input.files).forEach(function (file) {
    fd.append(opts.name, file, file.webkitRelativePath || file.name)
    files.push(file.webkitRelativePath || file.name)
  })
  cb(fd, files)
}

// old drag and drop API implemented in Chrome 11+
function entriesApi (items, opts, cb) {
  var fd = new FormData()
  var files = []
  var rootPromises = []

  function readEntries (entry, reader, oldEntries, cb) {
    var dirReader = reader || entry.createReader()
    dirReader.readEntries(function (entries) {
      var newEntries = oldEntries ? oldEntries.concat(entries) : entries
      if (entries.length) {
        setTimeout(readEntries.bind(null, entry, dirReader, newEntries, cb), 0)
      } else {
        cb(newEntries)
      }
    })
  }

  function readDirectory (entry, path, resolve) {
    if (!path) path = entry.name
    readEntries(entry, 0, 0, function (entries) {
      var promises = []
      entries.forEach(function (entry) {
        promises.push(new Promise(function (resolve) {
          if (entry.isFile) {
            entry.file(function (file) {
              var p = path + '/' + file.name
              fd.append(opts.name, file, p)
              files.push(p)
              resolve()
            }, resolve.bind())
          } else readDirectory(entry, path + '/' + entry.name, resolve)
        }))
      })
      Promise.all(promises).then(resolve.bind())
    })
  }

  [].slice.call(items).forEach(function (entry) {
    entry = entry.webkitGetAsEntry()
    if (entry) {
      rootPromises.push(new Promise(function (resolve) {
        if (entry.isFile) {
          entry.file(function (file) {
            fd.append(opts.name, file, file.name)
            files.push(file.name)
            resolve()
          }, resolve.bind())
        } else if (entry.isDirectory) {
          readDirectory(entry, null, resolve)
        }
      }))
    }
  })
  Promise.all(rootPromises).then(cb.bind(null, fd, files))
}

export default processFilesEvent
