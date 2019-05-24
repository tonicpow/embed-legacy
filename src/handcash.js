import Storage from './storage'

const Handcash = {}

// handCashLookup() - looks up a handle and returns an address
// @param handle is the $handcash handle
Handcash.lookup = async (handle) => {
  // No handle or invalid
  if (!handle || !handle.includes('$')) {
    console.error('invalid handcash handle: ' + handle)
    return ''
  }

  // Did we already look this up?
  let walletAddress = Storage.getStorage(handle)
  if (walletAddress !== null && walletAddress.length > 25) {
    console.log('handcash found locally, skipping lookup! ' + handle + ':' + walletAddress)
    return walletAddress
  }

  // Try to get the handle receiving address
  try {
    // Fetch the data from the handcash api
    let data = await Promise.all([
      fetch('https://api.handcash.io/api/receivingAddress/' + handle.substr(1)).then((response) => response.json())
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
    console.log('handcash response was invalid or missing receivingAddress', data)
    return ''
  } catch (error) {
    console.log(error, handle)
    return ''
  }
}

export default Handcash
