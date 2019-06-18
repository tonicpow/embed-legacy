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

BitSocket.socket = null
BitSocket.callback = null

BitSocket.connect = (cb) => {
  BitSocket.callback = cb

  // Subscribe
  BitSocket.socket = new EventSource('http://planaria.tonicpow.network/s/15jnZfxkjk3XAUTh76hJM1EuSX7CvC1JHS/' + b64)

  // Event handler
  BitSocket.socket.onmessage = (e) => {
    let data = JSON.parse(e.data || {}).data || []
    let type = JSON.parse(e.data || {}).type || ''
    if (data) {
      switch (type) {
        case 'open':
          BitSocket.callback(type, data)
          break
        case 'u':
          if (!data.length) { return }
          BitSocket.callback(type, data)
          break
        case 'block':
          conole.log('NEW BLOCK.', data)
          for (let iframe of tonicIframes) {
            iframe.contentWindow.postMessage({ block: JSON.stringify(data) }, 'https://app.tonicpow.com')
          }
      }
    }
  }

  BitSocket.socket.onerror = (e) => {
    return BitSocket.callback('error', e)
  }  
}

export default BitSocket