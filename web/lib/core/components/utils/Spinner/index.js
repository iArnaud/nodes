import './spinner.css'

export default () => (
  <div style={{ height: '100vh', width: '100vw' }}>
    <div className='lds-spinner'>
      <div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
    </div>
    <noscript><span style={{ color: 'white' }}>You need to enable javascript to run this app.</span></noscript>
  </div>
)
