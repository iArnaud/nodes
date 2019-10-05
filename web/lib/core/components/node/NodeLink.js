import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { Anchor } from 'grommet'

const NodeLink = ({ node, view, query = {}, router, label, children }) => {
  query = { ...query, node }
  if (view) {
    query[`${node}-view`] = view
  }
  let timeoutRef = React.useRef()
  let screenXRef = React.useRef()
  let screenYRef = React.useRef()
  const href = { pathname: router.pathname, query }

  const setRedirect = () => {
    if (router.query.node !== node || (view && (router.query[`${node}-view`] !== view))) {
      // console.log('set timeout')
      timeoutRef.current = setTimeout(() => {
        // console.log('redirect!')
        router.push(href)
      }, 1300)
    }
  }
  // NOTE: clean urls is possible but need proper testing
  // const queryString = Object.keys(query).filter(key => key !== 'node').map(key => {
  //   return encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
  // }).join('&')
  // console.log(queryString)
  // const cleanUrl = `${router.pathname}/${node}`
  // return <Link href={href} as={queryString ? cleanUrl + `?${queryString}` : cleanUrl}>
  return <Link href={href}>
    {React.cloneElement(children || <Anchor label={label || node} />, {
      onDragEnter: e => {
        e.preventDefault()
        // setRedirect()
      },
      onDragLeave: e => {
        e.preventDefault()
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
        // console.log('clear from drag leave')
      },
      onDragOver: e => {
        e.preventDefault()
        const { screenX, screenY } = e
        if (screenXRef.current && screenYRef.current) {
          if (screenX === screenXRef.current && screenY === screenYRef.current) {
            if (!timeoutRef.current) setRedirect()
          } else {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
            // console.log('clear from drag over', screenXRef.current, screenX, screenYRef.current, screenY)
          }
          screenXRef.current = screenX
          screenYRef.current = screenY
        } else {
          screenXRef.current = screenX
          screenYRef.current = screenY
        }
      },
      onDrop: e => {
        e.preventDefault()
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
        // console.log('clear from drop')
      }
    })}
  </Link>
}

export default withRouter(NodeLink)
