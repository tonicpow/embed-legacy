import Storage from './storage'

const Paymail = {}

// PaymailLookup() - looks up a handle and returns an address
// @param handle is the 1relay handle
Paymail.lookup = async (address) => {
  // No handle or invalid
  if (!address || !address.includes('@') || !address.includes('.')) {
    //todo: add email/paymail verification regex
    console.error('invalid paymail address: ' + address)
    return ''
  }

  // Did we already look this up?
  let walletAddress = Storage.getStorage(address)
  if (walletAddress !== null && walletAddress.length > 25) {
    console.log('paymail found locally, skipping lookup! ' + address + ':' + walletAddress)
    return walletAddress
  }

  // Try to get the handle receiving address
  try {
    // Fetch the data from the handcash api
    let data = await Promise.all([
      fetch('https://api.polynym.io/getAddress/' + address).then((response) => response.json())
    ])

    // Did we get a valid object response?
    if (typeof data === 'object' && data[0] && data[0].hasOwnProperty('address')) {
      walletAddress = data[0]['address']
      if (walletAddress.length > 25) {
        Storage.setStorage(address, walletAddress, (2 * 60 * 60)) // 2 Hour expiration
        return walletAddress
      }

      // Not a valid receiving address?
      console.log('receivingAddress was invalid:', walletAddress, data)
      return ''
    }

    // Not a valid response?
    console.log('Polynym response was invalid or missing address', data)
    return ''
  } catch (error) {
    console.log(error, address)
    return ''
  }
}

export default Paymail
