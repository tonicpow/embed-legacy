const Handcash = {}

// handCashLookup() - looks up a handle and returns an address
// @param handle is the $handcash handle
Handcash.lookup = async (handle) => {
  // Config
  let walletAddress = ''

  // No handle or invalid
  if (!handle || !handle.includes('$')) {
    console.error('invalid handcash handle: ' + handle)
    return ''
  }

  // Did we already look this up?
  walletAddress = localStorage.getItem(handle)
  if (walletAddress !== null && walletAddress.length >= 34 && walletAddress.startsWith('1')) {
    console.log('handcash found locally, skipping lookup! ' + handle + ':' + walletAddress)
    return walletAddress
  }

  // Try to get the handle receiving address
  try {

    // Fetch the data from the handcash api
    let data = await Promise.all([
      fetch('https://api.handcash.io/api/receivingAddress/' + handle.substr(1)).then((response) => response.json()),
    ]);

    // Did we get a valid object response?
    if (typeof data === "object" && data[0] && data[0].hasOwnProperty('receivingAddress')){
      walletAddress = data[0]['receivingAddress']
      if (walletAddress.length > 25) {
        localStorage.setItem(handle, walletAddress)
        return walletAddress
      }

      // Not a valid receiving address?
      console.log("receivingAddress was invalid:", walletAddress, data);
      return "";
    }

    // Not a valid response?
    console.log("handcash response was invalid or missing receivingAddress", data);
    return "";

  } catch (error) {
    console.log(error, handle);
    return "";
  }


  // Lookup handcash
  /*  try {
    console.log('fetching handcash handle: ' + handle)

    // Setup the request
    let request = new XMLHttpRequest()
    request.open('GET', 'https://api.handcash.io/api/receivingAddress/' + handle.substr(1), false)

    // Onload
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        let data = JSON.parse(request.responseText)

        // Got our bitcoin address?
        if (data.hasOwnProperty('receivingAddress')) {
          walletAddress = data.receivingAddress
          localStorage.setItem(handle, walletAddress)
          return walletAddress
        }
      } else if (request.status === 405) {
        // todo: handle this better
        console.log('method not allowed from handcash')
        return ''
      } else {
        // We reached our target server, but it returned an error
        console.error(request)
        return ''
      }
    }

    // On error
    request.onerror = function () {
      // There was a connection error of some sort
      console.error(request)
      return ''
    }

    // Send the GET request
    return request.send()
  } catch (e) {
    console.error('issue getting handcash handle', e)
    return ''
  }*/
}

export default Handcash