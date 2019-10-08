import Storage from './storage'

const Relay = {}

// RelayLookup() - looks up a handle and returns an address
// @param handle is the 1relay handle
Relay.lookup = async (handle) => {
  // No handle or invalid
  if (!handle || handle.charAt(0) !== '1') {
    console.error('invalid relay handle: ' + handle)
    return ''
  }

  // Did we already look this up?
  let walletAddress = Storage.getStorage(handle)
  if (walletAddress !== null && walletAddress.length > 25) {
    console.log('relay found locally, skipping lookup! ' + handle + ':' + walletAddress)
    return walletAddress
  }

  // Try to get the handle receiving address
  try {
    // Fetch the data from the handcash api
    let data = await Promise.all([
      fetch('https://relayx.io/api/receivingAddress/' + handle).then((response) => response.json())
    ])

    // Did we get a valid object response?
    if (typeof data === 'object' && data[0] && data[0].hasOwnProperty('receivingAddress')) {
      walletAddress = data[0]['receivingAddress']
      if (walletAddress.length > 25) {
        Storage.setStorage(handle, walletAddress, (2 * 60 * 60)) // 2 Hour expiration
        return walletAddress
      }

      // Not a valid receiving address?
      console.log('receivingAddress was invalid:', walletAddress, data)
      return ''
    }

    // Not a valid response?
    console.log('relay response was invalid or missing receivingAddress', data)
    return ''
  } catch (error) {
    console.log(error, handle)
    return ''
  }
}

export default Relay
