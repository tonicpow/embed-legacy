const BitSocket = {}
const MAP_PREFIX = '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5'
const query = {
  'v': 3,
  'q': {
    'find': {
      'out.s7': MAP_PREFIX,
      'out.s9': 'app',
      'out.s10': 'tonicpow'
    }
  },
  'limit': 10
}
// base64 encoded query
const b64 = btoa(JSON.stringify(query))

BitSocket.connect = () => {
  // Subscribe
  let bitsocket = new EventSource('https://genesis.bitdb.network/s/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/' + b64)

  // Event handler
  bitsocket.onmessage = async (e) => {
    let data = JSON.parse(e.data || {}).data || []
    let type = JSON.parse(e.data || {}).type || ''
    console.log('message type', type)
    if (data) {
      switch (type) {
        case 'u':
          if (!data.length) { return }
          BitSocket.onmessage(data)
          break
        case 'block':
          conole.log('NEW BLOCK. Update ad if current schedule expired.', data)
          for (let iframe of tonicIframes) {
            iframe.contentWindow.postMessage({ block: JSON.stringify(data) }, 'http://localhost:3000')
          }
      }
    }
  }
}

export default BitSocket
