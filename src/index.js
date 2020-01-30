import Tonic from './tonic.js'
// import BitSocket from './BitSocket.js'
import Storage from './storage.js'
import Handcash from './handcash.js'
import Relay from './relay.js'
import Paymail from './paymail.js'

/* global fetch */

// Start the TonicPow service
let TonicPow = {}

// Load modules
TonicPow.Storage = Storage
// TonicPow.BitSocket = BitSocket
TonicPow.Paymail = Paymail
TonicPow.Handcash = Handcash
TonicPow.Relay = Relay
TonicPow.Tonic = Tonic
TonicPow.Iframes = new Map()

// sessionName is the incoming query parameter from any link service
const sessionName = 'tncpw_session'
const maxCookieAgeDays = 60

// setOreo for creating new oreos
TonicPow.setOreo = (name, value, days) => {
  let d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
}

// captureVisitorSession will capture the session and store it
// Builds a cookie so it's sent on requests automatically
// Stores in local storage for easy access from the application
TonicPow.captureVisitorSession = (customSessionId = '') => {
  let sessionId = customSessionId
  if ((!customSessionId || customSessionId.length === 0) && typeof window !== 'undefined') {
    let urlParams = new URLSearchParams(window.location.search)
    sessionId = urlParams.get(sessionName)
  }
  if (sessionId && sessionId.length > 0) {
    TonicPow.setOreo(sessionName, sessionId, maxCookieAgeDays)
    TonicPow.Storage.setStorage(sessionName, sessionId, (24 * 60 * 60 * maxCookieAgeDays))
  }
}

// getVisitorSession will get the session if it exists
TonicPow.getVisitorSession = () => {
  return TonicPow.Storage.getStorage(sessionName)
}

// iframeLoader() - replaces each Tonic div with a corresponding iframe (embed widget)
TonicPow.iframeLoader = async () => {
  // We only work in a browser
  if (typeof window === 'undefined') {
    console.error('TonicPow embed only works in the browser')
    return
  }

  // Set config
  // todo: make config customizable and based on ENV
  const networkUrl = 'https://app.tonicpow.com' // Url for Tonic App
  const footerLinkHeight = 28 // Size for the footer link area (px)
  const defaultHeight = 250 // Height of the embed (px)
  const defaultWidth = 300 // Width of the embed (px)
  const defaultRatePerBlock = 546 // Default rate of sats per block
  const defaultCurrency = 'bsv' // Default currency type (bsv, usd)
  const acceptedCurrencies = ['bsv', 'usd'] // List of accepted currencies for conversions
  const defaultTonicId = 'embed-1' // Default unit-id (tonic-id) to use if not set
  const defaultAddress = '1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD' // Default address to set if not found (donations!)

  // Get sticker address from parent page
  let stickerAddress = (document.head.querySelector('[name=bitcoin-address][content]')) ? document.head.querySelector('[name=bitcoin-address][content]').content : ''

  // Get sticker tx from parent page
  let stickerTx = (document.head.querySelector('[name=bitcoin-tx][content]')) ? document.head.querySelector('[name=bitcoin-tx][content]').content : ''

  // Get the params
  let params = new URLSearchParams(window.location.search)

  // Get the affiliate and convert if needed
  let affiliate = params.get('affiliate')
  if (affiliate) {
    // ($handcash) (New way to resolve handcash 2.0 handles)
    if (affiliate.includes('$')) {
      affiliate = affiliate.replace('$', '') + '@handcash.io'
    }

    // (paymail)
    affiliate = (affiliate.includes('@')) ? await Paymail.lookup(affiliate) : affiliate

    // (1handle) //todo: there needs to be a better way to detect 1handle vs a wallet address
    affiliate = (affiliate.charAt(0) === '1' && affiliate.length < 25) ? await Relay.lookup(affiliate) : affiliate

    // Invalid affiliate
    if (typeof affiliate === 'undefined' || !affiliate || affiliate === '' || affiliate.length <= 25) {
      console.error('failed to set affiliate', affiliate)
      affiliate = ''
    }
  }

  // Get all tonic divs (This is redundant, but just protecting loading without divs)
  let tonicDivs = document.getElementsByClassName('tonic')
  if (!tonicDivs || tonicDivs.length === 0) {
    console.info('no tonic divs found with class \'tonic\'')
    return // No need to go further
  }

  // Loop all ad divs that we found
  for (let i = tonicDivs.length - 1; i >= 0; i--) {
    // Set the div
    let tonicDiv = tonicDivs[i]

    // Got a custom width size?
    let displayWidth = tonicDiv.getAttribute('data-width')
    if (!displayWidth || displayWidth === '') {
      displayWidth = defaultWidth
    }

    // Got a custom height size?
    let displayHeight = tonicDiv.getAttribute('data-height')
    if (!displayHeight || displayHeight === '') {
      displayHeight = defaultHeight
    }

    // Get the data-unit-id
    // todo: finish renaming unit-id to tonic-id
    let dataTonicId = tonicDiv.getAttribute('data-unit-id')
    if (!dataTonicId || dataTonicId === '') {
      console.log('data-unit-id not found, using default: ' + defaultTonicId)
      dataTonicId = defaultTonicId
    }

    // Get the data-address
    let dataAddress = tonicDiv.getAttribute('data-address')

    // Process handcash handle if given (uses handcash instead of address)
    // Using handcash will override the data-address given
    let handcashHandle = tonicDiv.getAttribute('data-handcash')
    let handcashAddress = ''
    if (handcashHandle && handcashHandle.includes('$')) {
      handcashAddress = handcashAddress.replace('$', '') + '@handcash.io'

      handcashAddress = await Paymail.lookup(handcashHandle)

      if (typeof handcashAddress === 'undefined' || !handcashAddress || handcashAddress === '' || handcashAddress.length <= 25) {
        handcashAddress = ''
      } else {
        // override the address with the handcash address
        dataAddress = handcashAddress
      }
    } else {
      handcashHandle = '' // return to empty string for including in iframe
    }

    // Process relayx 1handle handle if given (uses relayX 1handle instead of address)
    let relayHandle = tonicDiv.getAttribute('data-relayx')
    let relayAddress = ''
    if (relayHandle && relayHandle.charAt(0) === '1') {
      relayAddress = await Relay.lookup(relayHandle)

      if (typeof relayAddress === 'undefined' || !relayAddress || relayAddress === '' || relayAddress.length <= 25) {
        relayAddress = ''
      } else {
        // override the address with the 1handle address
        dataAddress = relayAddress
      }
    } else {
      relayHandle = '' // return to empty string for including in iframe
    }

    // Process paymail address if given (uses paymail address instead of address)
    let paymailAddress = tonicDiv.getAttribute('data-paymail')
    let paymailWalletAddress = ''
    if (paymailAddress && paymailAddress.includes('@')) {
      paymailWalletAddress = await Paymail.lookup(paymailAddress)

      if (typeof paymailWalletAddress === 'undefined' || !paymailWalletAddress || paymailWalletAddress === '' || paymailWalletAddress.length <= 25) {
        paymailWalletAddress = ''
      } else {
        // override the address with the paymail wallet address
        dataAddress = paymailWalletAddress
      }
    } else {
      paymailAddress = '' // return to empty string for including in iframe
    }

    // Only a valid bitcoin address is supported, otherwise use `data-handcash` or `data-relayx`
    // Fail-over is the sticker-address
    if (typeof dataAddress === 'undefined' || !dataAddress || dataAddress.length <= 25) {
      if (stickerAddress) {
        dataAddress = stickerAddress
        console.log('data-address not found or invalid: ' + dataAddress + ' using sticker address: ' + stickerAddress + ' tonic-id: ' + dataTonicId)
      } else {
        dataAddress = defaultAddress
        console.log('data-address not found or invalid: ' + dataAddress + ' using default address: ' + defaultAddress + ' tonic-id: ' + dataTonicId)
      }
    }

    // Do we have a known affiliate for this address?
    let knownAffiliate = Storage.getStorage('affiliate_' + dataAddress)
    if (knownAffiliate) {
      affiliate = knownAffiliate
      console.log('existing affiliate found in local storage: ' + affiliate)
    } else if (affiliate) { // Nope - let's store it for the future!
      Storage.setStorage('affiliate_' + dataAddress, affiliate, 24 * 60 * 60 * 60)
      console.log('saving new affiliate in local storage: ' + affiliate)
    }

    // Got a default rate?
    let rate = tonicDiv.getAttribute('data-rate')
    if (!rate || rate === '') {
      rate = defaultRatePerBlock
    }

    // Got a default image url?
    let imageUrl = tonicDiv.getAttribute('data-image')
    if (!imageUrl || imageUrl === '') {
      imageUrl = ''
    }

    // Got a default url?
    let defaultUrl = tonicDiv.getAttribute('data-url')
    if (!defaultUrl || defaultUrl === '') {
      defaultUrl = ''
    }

    // Got a custom link color
    let linkColor = tonicDiv.getAttribute('data-link-color')
    if (!linkColor || linkColor === '') {
      linkColor = ''
    } else {
      // Sanity check for color
      linkColor = linkColor.replace(/[^a-zA-Z]+/g, '')

      // Default if invalid
      if (linkColor.length !== 6 && linkColor.length !== 3) {
        linkColor = ''
      }
    }

    // Got a custom supported currency
    let currency = tonicDiv.getAttribute('data-currency')
    if (!currency || currency === '') {
      currency = defaultCurrency
    } else {
      // Not accepted at this time, switch back to default (user mistake?)
      if (acceptedCurrencies.indexOf(currency) === -1) {
        currency = defaultCurrency
        rate = defaultRatePerBlock
      }
    }

    // Force currency to lowercase
    currency = currency.toLowerCase()

    // Build the iframe, pass along configuration variables
    let iframe = document.createElement('iframe')
    iframe.src = networkUrl + '/?' +
      'unit_id=' + dataTonicId +
      '&address=' + dataAddress +
      (affiliate ? '&affiliate=' + affiliate : '') +
      (stickerAddress ? '&sticker_address=' + stickerAddress : '') +
      (stickerTx ? '&sticker_tx=' + stickerTx : '') +
      '&rate=' + rate +
      '&currency=' + currency +
      '&width=' + displayWidth +
      '&height=' + displayHeight +
      (imageUrl ? '&image=' + imageUrl : '') +
      (defaultUrl ? '&url=' + defaultUrl : '') +
      (linkColor ? '&link_color=' + linkColor : '') +
      '&cache=' + Math.random()
    iframe.width = displayWidth
    iframe.height = (parseInt(displayHeight) + footerLinkHeight)
    iframe.id = 'tonic_' + dataTonicId

    // hack to prevent scrollbars on some browsers (deprecated)
    iframe.setAttribute('scrolling', 'no')

    // Add the data to the iframe
    iframe.setAttribute('data-address', dataAddress)
    iframe.setAttribute('data-handcash', handcashHandle)
    iframe.setAttribute('data-paymail', paymailAddress)
    iframe.setAttribute('data-image', imageUrl)
    iframe.setAttribute('data-link-color', linkColor)
    iframe.setAttribute('data-relayx', relayHandle)
    iframe.setAttribute('data-sticker-address', stickerAddress)
    iframe.setAttribute('data-sticker-tx', stickerTx)
    iframe.setAttribute('data-unit-id', dataTonicId)
    iframe.setAttribute('data-url', defaultUrl)

    // Add affiliate to the iframe
    if (affiliate) {
      iframe.setAttribute('data-affiliate', affiliate)
    }

    // Extra attributes
    // iframe.allowfullscreen = true;
    // iframe.allowpaymentrequest = true;
    // iframe.referrerpolicy = 'unsafe-url';

    // Name and border
    iframe.importance = 'high'
    iframe.frameBorder = '0'
    iframe.style.border = 'none'
    iframe.style.overflow = 'hidden' // (app should take care of this)

    // Add transparency
    iframe.style.backgroundColor = 'transparent'
    iframe.allowTransparency = 'true'

    // Add to iframe map
    TonicPow.Iframes.set(dataTonicId, dataAddress)

    // Replace the div for the iframe
    tonicDiv.parentNode.replaceChild(iframe, tonicDiv)
  }
  console.log('Tonic Map:', TonicPow.Iframes)
}

// Load the TonicPow script(s) and default settings
TonicPow.load = () => {
  // We only work in a browser
  if (typeof window === 'undefined') {
    console.error('TonicPow embed only works in the browser')
    return
  }

  // Load all tonics found on the page (if we have div)
  let tonicDivs = document.getElementsByClassName('tonic')
  if (tonicDivs && tonicDivs.length > 0) {
    TonicPow.iframeLoader().then(r => {
      // do nothing right now
    })

    // Ping planaria for analytics
    let url = 'https://b.map.sv/ping/'
    fetch(url).then((r) => {
      return r.json()
    }).then(async (r) => {
      // console.log('r')
    })
  }

  // Process visitor token
  TonicPow.captureVisitorSession()

  // Connect socket now that we have tonic divs
  // BitSocket.connect((type, data) => {
  //   if (type === 'error') {
  //     console.error(data)
  //     return
  //   }

  //   if (type === 'open') {
  //     return
  //   }

  //   // Tonic Tx
  //   let tonics = TonicPow.processTonics(data)
  //   if (tonics.length > 0 && tonics[0].hasOwnProperty('tx')) {
  //     let tonic = tonics[0]
  //     if (TonicPow.Iframes.get(tonic.MAP.ad_unit_id) === tonic.MAP.site_address) {
  //       // There is a tonic on this page that wants this message
  //       let iframe = document.getElementById('tonic_' + tonic.MAP.ad_unit_id)
  //       if (iframe) {
  //         let params = new URLSearchParams(iframe.src)
  //         let address = params.get('address')
  //         console.log('address', address, 'tonic address', tonic.MAP.site_address, (address && address.length > 25 && address === tonic.MAP.site_address))
  //         if (address && address.length > 25 && address === tonic.MAP.site_address) {
  //           // Post tonic to iframe
  //           iframe.contentWindow.postMessage({ tonics: JSON.stringify(tonics) }, 'https://app.tonicpow.com')
  //         }
  //       }
  //     }
  //   }
  // })
}

// Load the TonicPow application if we are loaded dynamically
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // This loads if the <script> is dynamically injected into the page
  TonicPow.load()
  console.log('loaded via document.readyState')
} else {
  // This loads if the <script> is hardcoded in the html page in the <head>
  document.addEventListener('DOMContentLoaded', function () {
    TonicPow.load()
    console.log('loaded via DOMContentLoaded')
  })
}

// Store on the window (safely)
if (typeof window !== 'undefined') {
  window.TonicPow = TonicPow
}
