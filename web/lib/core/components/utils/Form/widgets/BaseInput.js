import React from 'react'
import { TextInput, Box } from 'grommet'

function BaseInput (props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  if (!props.id) {
    console.log('No id for', props)
    throw new Error(`no id for props ${JSON.stringify(props)}`)
  }
  const {
    value,
    readonly,
    disabled,
    autofocus,
    onBlur,
    onFocus,
    options,
    schema,
    formContext,
    registry,
    rawErrors,
    ...inputProps
  } = props

  inputProps.type = options.inputType || inputProps.type || 'text'
  const _onChange = ({ target: { value } }) => {
    return props.onChange(value === '' ? options.emptyValue : value)
  }

  // return (
  //   <input
  //     className='form-control'
  //     readOnly={readonly}
  //     disabled={disabled}
  //     autoFocus={autofocus}
  //     value={value == null ? '' : value}
  //     {...inputProps}
  //     onChange={_onChange}
  //     onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
  //     onFocus={onFocus && (event => onFocus(inputProps.id, event.target.value))}
  //   />
  // )
  return (
    <Box fill pad='xsmall'><TextInput
      data-testid={options.testid}
      readOnly={readonly}
      disabled={disabled}
      autoFocus={autofocus}
      value={value == null ? '' : value}
      plain
      {...inputProps}
      onChange={_onChange}
      onInput={_onChange}
      onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
      onFocus={onFocus && (event => onFocus(inputProps.id, event.target.value))}
    /></Box>
  )
}

BaseInput.defaultProps = {
  type: 'text',
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
  testid: null
}

export default BaseInput
