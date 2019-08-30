import React from 'react'
import PropTypes from 'prop-types'

import { Text, Box } from 'grommet'

const REQUIRED_FIELD_SYMBOL = '*'

function TitleField (props) {
  const { id, title, required } = props
  return (
    <legend id={id}>
      <Box pad='xsmall' align='center'><Text weight='bold' color='light-3' ><em>{title}</em></Text></Box>
      {required && <span className='required'>{REQUIRED_FIELD_SYMBOL}</span>}
    </legend>
  )
}

if (process.env.NODE_ENV !== 'production') {
  TitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool
  }
}

export default TitleField
