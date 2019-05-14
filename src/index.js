import Tonic from './tonic.js'
import bmap from './bmap.js'
import BitSocket from './BitSocket.js'
import Handcash from './handcash.js'

let TonicPow = {}
TonicPow.Handcash = Handcash
TonicPow.bmap = bmap
TonicPow.BitSocket = BitSocket

TonicPow.Iframes = new Map()

//todo: solve the below loading (different case when hardcoded in HTML vs dynamic script loading)

// On complete / interactive or if DOM loaded, start the loader
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // This loads if the <script> is dynamically injected into the page
  TonicPow.iframeLoader()
} else {
  // This loads if the <script> is hardcoded in the html page
  document.addEventListener('DOMContentLoaded', function () {
    TonicPow.iframeLoader()

    // Connect socket now that we have tonic divs
    BitSocket.connect((type, data) => {
      if (type === 'error') {
        console.error(data)
        return
      }

      if (type === 'open') {
        return
      }

      // Tonic Tx
      let tonics = TonicPow.processTonics(data)
      if (tonics.length > 0 && tonics[0].hasOwnProperty('tx')) {
        let tonic = tonics[0]
        if (TonicPow.Iframes.get(tonic.MAP.ad_unit_id) === tonic.MAP.site_pub_key) {
          // There is a tonic on this page that wants this message
          let iframe = document.getElementById('tonic_' + tonic.MAP.ad_unit_id)
          if (iframe) {
            // Post tonic to iframe
            iframe.contentWindow.postMessage({ tonics: JSON.stringify(tonics) }, 'https://app.tonicpow.com')
          }
        }
      }
    })
  })
}

// takes an array of transactions
TonicPow.processTonics = (tonics) => {
  let newTonics = []
  for (let tonic of tonics) {
    // If its in the blacklist, continue
    // if (this.blacklist.indexOf(tonic.tx.h) !== -1) { continue }
    let tonicObj = new Tonic(bmap.TransformTxs(tonic))
    // we always run this to get .html on there
    newTonics.push(tonicObj)
  }
  return newTonics
}

// iframeLoader() - replaces each tonic div with a corresponding iframe
TonicPow.iframeLoader = async () => {
  // Set config
  const networkUrl = 'https://app.tonicpow.com' // Url for Tonic App
  const footerLinkHeight = 28 // Size for the footer link area (px)
  const defaultHeight = 250 // Height of the embed (px)
  const defaultWidth = 300 // Width of the embed (px)
  const defaultRatePerBlock = 546 // Default rate of sats per block
  const defaultCurrency = 'bsv' // Default currency type (bsv, usd)
  const acceptedCurrencies = ['bsv', 'usd'] // List of accepted currencies for conversions
  const defaultUnitId = 'embed-1' // Default unit-id to use if not set
  const defaultAddress = '1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD' // Default address to set if not found (donations!)

  // Get sticker address from parent page
  let stickerAddress = (document.head.querySelector('[name=bitcoin-address][content]')) ? document.head.querySelector('[name=bitcoin-address][content]').content : ''

  // Get sticker tx from parent page
  let stickerTx = (document.head.querySelector('[name=bitcoin-tx][content]')) ? document.head.querySelector('[name=bitcoin-tx][content]').content : ''

  // Get the params
  let params = new URLSearchParams(window.location.search)

  // Get the affiliate and convert if needed ($handcash)
  let affiliate = params.get('affiliate')
  if (affiliate) {
    // condition is always true: affiliate !== null
    //affiliate = (affiliate !== null && affiliate.includes('$')) ? await Handcash.lookup(affiliate) : affiliate
    affiliate = (affiliate.includes('$')) ? await Handcash.lookup(affiliate) : affiliate

    if (typeof affiliate === 'undefined' || !affiliate || affiliate === '' || affiliate.length <= 25) {
      affiliate = ''
    }  
  }
  
  // Get all tonic divs
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
    let dataUnitId = tonicDiv.getAttribute('data-unit-id')
    if (!dataUnitId || dataUnitId === '') {
      console.log('data-unit-id not found, using default: ' + defaultUnitId)
      dataUnitId = defaultUnitId
    }

    // Get the data-address
    let dataAddress = tonicDiv.getAttribute('data-address')

    // @mrz - no conversion anymore, I split "data-handcash" and "data-address" into their own concerns
    //dataAddress = await (dataAddress && dataAddress.includes('$')) ? Handcash.lookup(dataAddress) : dataAddress
    if (typeof dataAddress === 'undefined' || !dataAddress || dataAddress.length < 34) {
      if (stickerAddress) {
        dataAddress = stickerAddress
        console.log('data-address not found or invalid: ' + dataAddress + ' using sticker address: ' + stickerAddress)
      } else {
        dataAddress = defaultAddress
        console.log('data-address not found or invalid: ' + dataAddress + ' using default address: ' + defaultAddress)
      }
    }

    // Process handcash handle if given (uses handcash instead of address
    // Using handcash will override the data-address given
    let handcashHandle = tonicDiv.getAttribute('data-handcash')
    let handcashAddress = ''
    if (handcashHandle && dataAddress.includes('$')) {
      handcashAddress = await Handcash.lookup(handcashHandle)

      if (typeof handcashAddress === 'undefined' || !handcashAddress || handcashAddress === '' || handcashAddress.length <= 25) {
        handcashAddress = ''
      } else {
        // override the address with the handcash address
        dataAddress = handcashAddress
      }
    }

    // If we have an affiliate, let's store it for the future
    let knownAffiliate = localStorage.getItem('affiliate_' + dataAddress)
    if (knownAffiliate) {
      affiliate = knownAffiliate
      console.log('affiliate found in local storage: ' + affiliate)
    } else if (affiliate) {
      localStorage.setItem('affiliate_' + dataAddress, affiliate)
      console.log('saving affiliate in local storage: ' + affiliate)
    }

    // Got a state to load by default
    let loadState = tonicDiv.getAttribute('data-state')
    if (!loadState || loadState === '') {
      loadState = ''
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

    // Got a custom background color
    let backgroundColor = tonicDiv.getAttribute('data-bg-color')
    if (!backgroundColor || backgroundColor === '') {
      backgroundColor = ''
    }

    // Got a custom link color
    let linkColor = tonicDiv.getAttribute('data-link-color')
    if (!linkColor || linkColor === '') {
      linkColor = ''
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
    iframe.src = networkUrl + '/' + loadState + '?' +
      'unit_id=' + dataUnitId +
      '&address=' + dataAddress +
      (affiliate ? '&affiliate=' + affiliate : '') +
      (stickerAddress ? '&sticker_address=' + stickerAddress : '') +
      (stickerTx ? '&sticker_tx=' + stickerTx : '') +
      '&rate=' + rate +
      '&currency=' + currency +
      '&width=' + displayWidth +
      '&height=' + displayHeight +
      (imageUrl ? '&image=' + imageUrl : '') +
      (backgroundColor ? '&background_color=' + backgroundColor : '') +
      (linkColor ? '&link_color=' + linkColor : '') +
      '&cache=' + Math.random()
    iframe.width = displayWidth
    iframe.height = (parseInt(displayHeight) + footerLinkHeight)
    iframe.id = 'tonic_' + dataUnitId

    // Add the data to the iframe
    iframe.setAttribute('data-unit-id', dataUnitId)
    iframe.setAttribute('data-address', dataAddress)
    if (affiliate) {
      iframe.setAttribute('data-affiliate', affiliate)
    }
    iframe.setAttribute('data-sticker-address', stickerAddress)
    iframe.setAttribute('data-sticker-tx', stickerTx)
    iframe.setAttribute('data-handcash', handcashHandle)

    // Extra attributes
    // iframe.allowfullscreen = true;
    // iframe.allowpaymentrequest = true;
    // iframe.referrerpolicy = "unsafe-url";
    // iframe.scrolling = "no"; (this stops scrolling as well

    // Name and border
    iframe.importance = 'high'
    iframe.frameBorder = '0'
    iframe.style.border = 'none'
    iframe.style.overflow = 'hidden' // (app should take care of this)

    // Add to iframe map
    TonicPow.Iframes.set(dataUnitId, dataAddress)

    // Replace the div for the iframe
    tonicDiv.parentNode.replaceChild(iframe, tonicDiv)
  }
  console.log('Tonic Map:', TonicPow.Iframes)
}

window.TonicPow = TonicPow