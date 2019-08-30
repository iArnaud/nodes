import Particles from './Particles'

const NodehubLogo = ({ style = {} } = {}) => (
  <Particles
    params={{
      particles: {
        number: {
          value: 6
        },
        move: {
          speed: 1
        },
        line_linked: {
          shadow: {
            enable: true,
            color: '#3CA9D1',
            blur: 5
          },
          color: '#01a982'
        }
      },
      interactivity: {
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          }
          // onclick: {
          //   enable: true,
          //   mode: 'repulse'
          // }
        }
      }
    }}
    style={{
      width: '100%',
      height: '100%',
      ...style
    }} />
)

export default NodehubLogo
