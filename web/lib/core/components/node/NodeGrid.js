import React from 'react'
import { Grid, InfiniteScroll, Button } from 'grommet'

// const NodeGrid = ({
//   nodes, Item, onMore, fill = true, step = 10,
//   columns = { count: 'fill', size: 'small' }, rows = 'small',
//   gap = { row: 'small', column: 'small' } }) => {
//   return (
//     <Grid
//       fill={fill}
//       columns={columns}
//       rows={rows}
//       gap={gap}
//     >
//       <InfiniteScroll items={nodes} step={step} onMore={onMore}>
//         {node => (
//           <Item key={node.id} node={node} />
//         )}
//       </InfiniteScroll>
//     </Grid>
//   )
// }

const NodeGrid = ({
  nodes, Item, onMore, fill = true, step = 10,
  columns = { count: 'fill', size: 'small' }, rows = 'small',
  gap = { row: 'small', column: 'small' } }) => {
  return (
    <Grid
      fill={fill}
      columns={columns}
      rows={rows}
      gap={gap}
    >
      {nodes.map(node => (
        <Item key={node.id} node={node} />
      ))}
      {onMore && <Button label='Load more..' onClick={onMore} />}
    </Grid>
  )
}

export default NodeGrid
