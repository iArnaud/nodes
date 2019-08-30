import React from 'react'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'

const NodeUsersProvider = class extends React.Component {
  state = { users: [] }

  async getUsers () {
    const { node, napi } = this.props
    return (await napi.getNodeUsers(node)).items
  }

  async componentDidMount () {
    const users = await this.getUsers()
    this.setState({ users: users })
  }

  async componentDidUpdate (prevProps, prevState) {
    const { node } = this.props
    if (!isEqual(get(node, 'sides.users'), get(prevProps.node, 'sides.users'))) {
      const users = await this.getUsers()
      this.setState({ users: users })
    }
  }

  render () {
    const { users } = this.state
    const children = React.Children.map(this.props.children, child => React.cloneElement(child, { users }))
    return <React.Fragment>{children}</React.Fragment>
  }
}

export default NodeUsersProvider
