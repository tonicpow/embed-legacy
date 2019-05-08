import Tonic from './tonic.js'
import bmap from './bmap.js'
import BitSocket from './BitSocket.js'
import Handcash from './handcash.js'
let tonicIframes = new Map()

// On complete / interactive or if DOM loaded, start the loader
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // This loads if the <script> is dynamically injected into the page
  iframeLoader()
} else {
  // This loads if the <script> is hardcoded in the html page
  document.addEventListener('DOMContentLoaded', function () {
    iframeLoader()

    // Connect socket now that we have tonic divs
    BitSocket.connect()
    BitSocket.onmessage = async (data) => {
      let tonics = await this.processTonics(data)
      if (tonics.length > 0 && tonics[0].hasOwnProperty('tx')) {
        tonic = tonics[0]
        if (tonicIframes.get(tonic.MAP.ad_unit_id) === tonic.MAP.site_pub_key) {
          // There is a tonic on this page that wants this message
          let iframe = document.getElementById('iframe_' + tonic.MAP.ad_unit_id)
          if (iframe) {
            // Post tonic to iframe
            iframe.contentWindow.postMessage({ tonics: JSON.stringify(tonics) }, 'http://localhost:3000')
          }
        }
      }
    }
  })
}

// iframeLoader() - replaces each tonic div with a corresponding iframe
function iframeLoader () {
  // Set config
  const networkUrl = 'https://app.tonicpow.com' // Url for Tonic App
  const footerLinkHeight = 28 // Size for the footer link area (px)
  const defaultHeight = 250 // Height of the embed (px)
  const defaultWidth = 300 // Width of the embed (px)
  const defaultRatePerBlock = 546 // Default rate of sats per block
  const defaultCurrency = 'bsv' // Default currency type (bsv, usd)
  const acceptedCurrencies = ['bsv', 'usd'] // List of accepted currencies for conversions
  const defaultUnitId = 'embed-1' // Default unit-id to use if not set
  const defaultPubKey = '1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD' // Default pubkey to set if not found (donations!)

  // Get sticker address from parent page
  let stickerAddress = (document.head.querySelector('[name=bitcoin-address][content]')) ? document.head.querySelector('[name=bitcoin-address][content]').content : ''

  // Get sticker tx from parent page
  let stickerTx = (document.head.querySelector('[name=bitcoin-tx][content]')) ? document.head.querySelector('[name=bitcoin-tx][content]').content : ''

  // Get the params
  let params = new URLSearchParams(window.location.search)

  // Get the affiliate and convert if needed ($handcash)
  let affiliate = params.get('affiliate')
  affiliate = (affiliate !== null && affiliate.includes('$')) ? Handcash.lookup(affiliate) : affiliate

  if (typeof affiliate === 'undefined' || !affiliate || affiliate === '' || affiliate.length <= 25) {
    console.log('affiliate not found or invalid: " + affiliate + " using empty affiliate value')
    affiliate = ''
  }

  // Get all tonic divs
  let tonicDivs = document.getElementsByClassName('tonic')
  if (!tonicDivs || tonicDivs.length === 0) {
    console.error('no tonic divs found with class tonic')
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

    // Get the data-pubkey
    let dataPubKey = tonicDiv.getAttribute('data-pubkey')

    // Convert data-pubkey if needed from $handcash
    dataPubKey = (dataPubKey.includes('$')) ? Handcash.lookup(dataPubKey) : dataPubKey
    if (typeof dataPubKey === 'undefined' || !dataPubKey || dataPubKey === '' || dataPubKey.length <= 25) {
      if (stickerAddress) {
        dataPubKey = stickerAddress
        console.log('data-pubkey not found or invalid: ' + dataPubKey + ' using sticker address: ' + stickerAddress)
      } else {
        dataPubKey = defaultPubKey
        console.log('data-pubkey not found or invalid: ' + dataPubKey + ' using default address: ' + defaultPubKey)
      }
    }

    // If we have an affiliate, let's store it for the future
    let knownAffiliate = localStorage.getItem('affiliate_' + dataPubKey)
    if (knownAffiliate) {
      affiliate = knownAffiliate
      console.log('affiliate found in local storage: ' + affiliate)
    } else if (affiliate) {
      localStorage.setItem('affiliate_' + dataPubKey, affiliate)
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
      '&pubkey=' + dataPubKey +
      '&affiliate=' + affiliate +
      '&sticker_address=' + stickerAddress +
      '&sticker_tx=' + stickerTx +
      '&rate=' + rate +
      '&currency=' + currency +
      '&width=' + displayWidth +
      '&height=' + displayHeight +
      '&image=' + imageUrl +
      '&background_color=' + backgroundColor +
      '&link_color=' + linkColor +
      'cache=' + Math.random()
    iframe.width = displayWidth
    iframe.height = (parseInt(displayHeight) + footerLinkHeight)
    iframe.name = 'tonic_' + dataUnitId

    // Add the data to the iframe
    iframe.setAttribute('data-unit-id', dataUnitId)
    iframe.setAttribute('data-pubkey', dataPubKey)
    iframe.setAttribute('data-affiliate', affiliate)
    iframe.setAttribute('data-sticker-address', stickerAddress)

    // Add to iframe map
    tonicIframes.set(dataUnitId, dataPubKey)

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

    // Replace the div for the iframe
    tonicDiv.parentNode.replaceChild(iframe, tonicDiv)
  }
  console.log('Tonic Map:', tonicIframes)
}