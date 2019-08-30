import { FormField, Box } from 'grommet'

function CustomFieldTemplate (props) {
  const { id, label, help, errors, children, schema } = props
  const error = errors.props.errors && errors.props.errors.join(' ')
  return (
    schema.type === 'object' || schema.type === 'boolean' || schema.type === 'array'
      ? <Box pad='small'>{children}</Box>
      : (
        <Box>
          <FormField
            htmlFor={id}
            label={label}
            help={help}
            error={error}
            plain
          >
            {children}
          </FormField>
        </Box>
      )
  )
}

export default CustomFieldTemplate
