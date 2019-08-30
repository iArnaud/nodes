import './form.css'

import Form from 'react-jsonschema-form'
import { Button, Box } from 'grommet'
import { FieldTemplate, ObjectFieldTemplate, ArrayFieldTemplate } from './templates'
import {
  BaseInput,
  CheckboxWidget,
  SelectWidget
  // CodeWidget
} from './widgets'
import { DescriptionField, TitleField } from './fields'

const customFields = { DescriptionField, TitleField }
const customWidgets = {
  BaseInput,
  CheckboxWidget,
  SelectWidget
  // CodeWidget
}

export default (props) => (
  <Form
    className='myform'
    ObjectFieldTemplate={ObjectFieldTemplate}
    ArrayFieldTemplate={ArrayFieldTemplate}
    FieldTemplate={FieldTemplate}
    widgets={customWidgets}
    fields={customFields}
    showErrorList={false}
    noHtml5Validate
    {...props}
  >
    <Box fill='horizontal' align='center' pad='xsmall'><Button primary data-testid='submit.action' type='submit' label='Submit' /></Box>
  </Form>
)
