// In the case where we have to implicitly create a schema, it is useful to know what type to use
//  based on the data we are defining
export const guessType = function guessType (value) {
  if (Array.isArray(value)) {
    return 'array'
  } else if (typeof value === 'string') {
    return 'string'
  } else if (value == null) {
    return 'null'
  } else if (typeof value === 'boolean') {
    return 'boolean'
  } else if (!isNaN(value)) {
    return 'number'
  } else if (typeof value === 'object') {
    return 'object'
  }
  // Default to string if we can't figure it out
  return 'string'
}

export function asNumber (value) {
  if (value === '') {
    return undefined
  }
  if (value === null) {
    return null
  }
  if (/\.$/.test(value)) {
    // "3." can't really be considered a number even if it parses in js. The
    // user is most likely entering a float.
    return value
  }
  if (/\.0$/.test(value)) {
    // we need to return this as a string here, to allow for input like 3.07
    return value
  }
  const n = Number(value)
  const valid = typeof n === 'number' && !Number.isNaN(n)

  if (/\.\d*0$/.test(value)) {
    // It's a number, that's cool - but we need it as a string so it doesn't screw
    // with the user when entering dollar amounts or other values (such as those with
    // specific precision or number of significant digits)
    return value
  }

  return valid ? n : value
}
