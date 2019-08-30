export default ({ React, Box }) => {
  const ANNOTATION_TYPES = {
    cursor: 'cursor'
  }

  const renderAnnotation = (props, editor, next) => {
    const { children, annotation, attributes } = props
    const { type, data } = annotation
    const { color, name } = data.toJS()

    switch (type) {
      case ANNOTATION_TYPES.cursor:
        return (
          <Box as='span'
            {...attributes}
            style={{
              backgroundColor: color,
              display: 'inline-block'
            }}
            width='2px'
          >
            {children}
            <Box
              as='span'
              style={{
                backgroundColor: color,
                paddingRight: '2px',
                position: 'relative',
                display: 'inline-block'
              }}
            >
              <Box as='span'
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '100%',
                  color: color,
                  fontSize: '12px',
                  display: 'inline-block',
                  direction: 'row',
                  overflowWrap: 'normal',
                  whiteSpace: 'nowrap'
                }}
              >
                {name}
              </Box>
            </Box>
          </Box>
        )
      default:
        return next()
    }
  }

  return { renderAnnotation, ANNOTATION_TYPES }
}
