export default async ({ __deps__, __imports__ }) => {
  const { Button, Box, TextInput, Paragraph, Anchor, Text, Image } = __imports__.grommet
  const { React, icons, lodash: _ } = __imports__.utils
  const { NodePreview } = __imports__.nodehub
  const { napi, iconSize, viewer } = __deps__

  const Search = ({ onSubmit, q }) => {
    const [val, setVal] = React.useState(q)
    return (
      <Box fill direction='row' gap='xsmall'>
        <Button plain onClick={() => onSubmit(val)}><icons.Search /></Button>
        <TextInput
          onKeyPress={(e) => (e.key === 'Enter') && onSubmit(val)}
          placeholder='Search'
          defaultValue={q}
          autoFocus
          onChange={event => {
            setVal(event.target.value)
          }}
        />
      </Box>
    )
  }

  const view = class extends React.Component {
    constructor (props) {
      super(props)
      const { node } = this.props
      const { q, results = [], top, provider } = _.get(node, 'sides.search', {})
      this.state = { top, results, q, provider }
      this.onSubmit = this.onSubmit.bind(this)
      this.makeSearch = this.makeSearch.bind(this)
    }

    onSubmit (q) {
      this.setState({ q })
      // window.open(`https://google.com/search?q=${q}`, '_blank')
    }

    async makeSearch () {
      const { node } = this.props
      const { q } = this.state
      let provider = null
      if (q.startsWith('g:')) {
        // window.open(`https://google.com/search?q=${q}`, '_blank')
        provider = 'google'
      } else if (q.startsWith('d:')) {
        provider = 'duckduckgo'
      }
      const result = await napi.search(q, provider)
      if (napi.hasPermission(viewer, node, 'editSide')) {
        await napi.updateNodeSide(node, 'search', { ...result, q, provider })
      }
      return { ...result, provider }
    }
    async componentDidMount () {}
    async componentDidUpdate (prevProps, prevState) {
      const { q } = this.state
      if (q && q !== prevState.q) {
        const { top, results, provider } = await this.makeSearch()
        this.setState({ results, top, provider })
      }
    }

    render () {
      const { node } = this.props
      const { results, q, top, provider } = this.state
      return (
        <Box align='center' justify={top ? 'start' : 'center'} fill gap='small' pad='small'>
          <Box fill='horizontal' style={{ minHeight: '50px' }} pad='small' round background={{ color: 'black', opacity: 'medium' }} ><Search q={q} onSubmit={this.onSubmit} /></Box>
          { top && <Box direction='row' align='center' justify='center' fill='horizontal' height='medium' round background={{ color: 'black', opacity: 'medium' }}>
            {top.image && <Box height='small' width='small'><Image src={top.image} height='small' width='small' fit='contain' /></Box>}
            <Box>
              <Text weight='bold'>{top.title}</Text>
              <Paragraph>{top.description}</Paragraph>
              <Anchor href={top.url} target='_blank' >{top.url}</Anchor>
            </Box>
          </Box> }
          <Box overflow='scroll' gap='small' fill={top} background={{ color: 'black', opacity: 'medium' }} round pad={results.length ? 'small' : null}>
            {results.map(result => (
              provider
                ? <Box key={result.url} fill='horizontal' align='start' justify='start' gap='xsmall' style={{ minHeight: '50px' }} background={{ color: 'black', opacity: 'strong' }} round pad='small' >
                  <Box fill align='center' justify='between' direction='row' >
                    <Box>
                      <Text>{result.description}</Text>
                      <Anchor size='small' href={result.url} target='_blank' >{result.url}</Anchor>
                    </Box>
                    <Box>
                      <Button plain onClick={async () => {
                        napi.createNode(null, { parentId: node.id, name: result.title, sides: { link: { url: result.url, preview: true } } })
                      }}><icons.LinkBottom color='control' /></Button>
                    </Box>
                  </Box>
                </Box>
                : <Box key={result.id} width='small'><NodePreview
                  node={result}
                  viewer={viewer}
                  napi={napi}
                  showPreview={_.get(result.sides, 'settings.ui.background.image') !== _.get(node.sides, 'settings.ui.background.image')}
                /></Box>
            ))}
          </Box>
        </Box>
      )
    }
  }

  const icon = ({ node }) => <Box fill align='center' justify='center'><icons.Search size={iconSize} /></Box>
  const preview = icon
  const edit = view

  return {
    modes: {
      icon,
      preview,
      view,
      edit
    }
  }
}
