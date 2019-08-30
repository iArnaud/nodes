let Particles

if (typeof window !== 'undefined') {
  Particles = require('react-particles-js').default
}

const params = {
  'particles': {
    'number': {
      'value': 50,
      'density': {
        'enable': true
      }
    },
    'size': {
      'value': 3,
      'random': true,
      'anim': {
        'speed': 4,
        'size_min': 0.3
      }
    },
    'line_linked': {
      'enable': false
    },
    'move': {
      'random': true,
      'speed': 1,
      'direction': 'top',
      'out_mode': 'out'
    }
  }
}

export default (props) => Particles ? <Particles params={params} style={{
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  top: 0
}} {...props} /> : null
