import { Box } from 'grommet'

function ObjectFieldTemplate (props) {
  const { TitleField, DescriptionField } = props
  return (
    <Box fill background={{ color: 'black', opacity: 'medium' }} pad='small' round='small' overflow='scroll'>
      {(props.uiSchema['ui:title'] || props.title) && (
        <TitleField
          id={`${props.idSchema.$id}__title`}
          title={props.title || props.uiSchema['ui:title']}
          required={props.required}
          formContext={props.formContext}
        />
      )}
      {props.description && (
        <DescriptionField
          id={`${props.idSchema.$id}__description`}
          description={props.description}
          formContext={props.formContext}
        />
      )}
      <Box fill direction='column'>{props.properties.map(prop => prop.content)}</Box>
    </Box>
  )
}

export default ObjectFieldTemplate
