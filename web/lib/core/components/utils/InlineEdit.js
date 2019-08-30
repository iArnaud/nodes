import React from 'react'
import { TextInput, Box } from 'grommet'

const TAB_KEY_CODE = 9
const ENTER_KEY_CODE = 13
const ESCAPE_KEY_CODE = 27

export default class EditableLabel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEditing: this.props.isEditing || false,
      text: this.props.text || '',
      prevText: this.props.text || '',
      editIconVisibility: false
    }
    this._handleFocus = this._handleFocus.bind(this)
    this._handleChange = this._handleChange.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
  }

  _handleFocus (escaped = false) {
    if (this.state.isEditing) {
      if (typeof this.props.onFocusOut === 'function') {
        if (escaped) {
          this.setState({ text: this.state.prevText })
          if (this.props.raiseOnFocusOutOnEsc) {
            this.props.onFocusOut(this.state.text)
          }
        } else {
          let text = this.state.text
          if (this.state.text === '' && !this.props.allowEmpty) {
            text = this.state.prevText
          }
          this.setState({ prevText: text, text })
          this.props.onFocusOut(text)
        }
      }
    } else {
      if (typeof this.props.onFocus === 'function') {
        this.props.onFocus(this.state.text)
      }
    }
    this._onLabelMouseOut()
    this.setState({ isEditing: !this.state.isEditing })
  }

  _handleChange (e) {
    this.setState({ text: e.target.value })
  }

  _onLabelMouseOver () {
    this.setState({ editIconVisibility: true })
  }

  _onLabelMouseOut () {
    this.setState({ editIconVisibility: false })
  }

  _handleEnterKey () {
    this._handleFocus()
  }

  _handleEscapeKey (e) {
    this._handleFocus(true)
  }

  _handleKeyDown (e) {
    if (e.keyCode === ENTER_KEY_CODE || e.keyCode === TAB_KEY_CODE) {
      this._handleEnterKey()
    } else if (e.keyCode === ESCAPE_KEY_CODE) {
      this._handleEscapeKey()
    }
  }

  render () {
    if (this.state.isEditing) {
      return (
        <Box background={{ color: 'black', opacity: 'medium' }} border={{ side: 'bottom', color: 'control' }} fill pad='xsmall'>
          <TextInput
            style={{ padding: '0px', margin: '0px', width: '100%', height: '100%' }}
            plain
            value={this.state.text}
            onChange={this._handleChange}
            onFocus={e => e.target.select()}
            onBlur={this._handleFocus}
            onKeyDown={this._handleKeyDown}
            autoFocus
          />
        </Box>
      )
    }

    return (
      <Box pad='xsmall' round='xsmall' background={this.state.editIconVisibility ? { color: 'black', opacity: 'medium' } : null}>
        <label
          style={{ cursor: 'text' }}
          onMouseOver={() => this._onLabelMouseOver()}
          onMouseLeave={() => this._onLabelMouseOut()}
          onClick={this._handleFocus}
          onKeyDown={this._handleKeyDown}
        >
          {this.state.text}
        </label>
      </Box>
    )
  }
}
