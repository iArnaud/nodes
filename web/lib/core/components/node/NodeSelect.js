import React from 'react'
import { Box, TextInput, Text } from 'grommet'
import { Search } from 'grommet-icons'

import Avatar from 'react-avatar'
import get from 'lodash/get'
// import debounce from 'lodash/debo'

class NodeSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '', suggestionOpen: false, suggestedNodes: [] }
    // this.onChange = debounce(this.onChange, 200)
  }

  boxRef = React.createRef()

  componentDidMount () {
    this.forceUpdate()
  }

  onChange = event => {
    // event.persist()
    this.setState({ value: event.target.value }, async () => {
      const { value } = this.state
      if (!value.trim()) {
        this.setState({ suggestedNodes: [] })
      } else {
        const res = await this.props.napi.search(value)
        const nodes = res.results
        const results = nodes.map(node => ({ id: node.id, isUser: get(node, 'sides.user'), name: node.name, avatar: get(node, 'sides.user') ? node.sides.user.avatar : get(node, 'sides.settings.ui.background.image') ? node.sides.settings.ui.background.image.slice(4, -1) : null }))
        this.setState({ suggestedNodes: this.props.users ? results.filter(result => result.isUser) : results })
      }
    })
  }

  onSelect = event => {
    const { value, item } = event.suggestion
    this.setState({ value })
    if (this.props.onSelect) this.props.onSelect(item)
  }

  renderSuggestions = () => {
    const { value, suggestedNodes } = this.state

    return suggestedNodes
      .filter(
        ({ name }) => name.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
      .map(({ id, name, avatar }, index, list) => ({
        label: (
          <Box
            data-testid={`addUser.${name}.suggestion`}
            direction='row'
            align='center'
            gap='small'
            border={index < list.length - 1 ? 'bottom' : undefined}
            pad='small'
          >
            <Avatar
              size={36}
              round
              name={name}
              src={avatar}
            />
            <Text weight='bold'>{name}</Text>
          </Box>
        ),
        value: name,
        item: {
          name,
          id
        }
      }))
  }

  render () {
    const { suggestionOpen, value } = this.state

    return (
      <Box
        ref={this.boxRef}
        fill='horizontal'
        direction='row'
        align='center'
        pad={{ horizontal: 'small', vertical: 'xsmall' }}
        round='small'
        elevation={suggestionOpen ? 'medium' : undefined}
        border={{
          side: 'all',
          color: suggestionOpen ? 'transparent' : 'border'
        }}
        style={
          suggestionOpen
            ? {
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '0px'
            }
            : undefined
        }
      >
        <Search color='control' />
        <TextInput
          data-testid='addUser.search.input'
          type='search'
          dropTarget={this.boxRef.current}
          plain
          value={value}
          onChange={this.onChange}
          onSelect={this.onSelect}
          suggestions={this.renderSuggestions()}
          placeholder='Search by name...'
          onSuggestionsOpen={() => this.setState({ suggestionOpen: true })}
          onSuggestionsClose={() =>
            this.setState({ suggestionOpen: false })
          }
        />
      </Box>
    )
  }
}

export default NodeSelect
