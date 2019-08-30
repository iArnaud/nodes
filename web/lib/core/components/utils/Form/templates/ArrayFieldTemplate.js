import { Box, Button } from 'grommet'
import { Add, LinkUp, LinkDown, Trash } from 'grommet-icons'

const ArrayFieldTemplate = (props) => {
  return (
    <Box className={props.className}>
      {props.items &&
        props.items.map(element => (
          <Box key={element.index}>
            <Box>{element.children}</Box>
            <Box direction='row' fill='horizontal' align='center' justify='between'>
              {element.hasMoveDown && (
                <Button
                  plain
                  onClick={element.onReorderClick(
                    element.index,
                    element.index + 1
                  )}>
                  <LinkDown />
                </Button>
              )}
              {element.hasMoveUp && (
                <Button
                  plain
                  onClick={element.onReorderClick(
                    element.index,
                    element.index - 1
                  )}>
                  <LinkUp />
                </Button>
              )}
              <Button plain onClick={element.onDropIndexClick(element.index)}>
                <Trash />
              </Button>
            </Box>
          </Box>
        ))}

      {props.canAdd && (
        <Box align='center' justify='center'>
          <Button plain onClick={props.onAddClick} type='button'>
            <Add />
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default ArrayFieldTemplate
