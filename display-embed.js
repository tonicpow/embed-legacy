// On complete / interactive or if DOM loaded
if(document.readyState === "complete" || document.readyState === "interactive") {
  iframeLoader();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    iframeLoader();
  });
}

// connectBitSocket()
// Gets loaded in iframeLoader
function connectBitSocket () {
  // Write a bit query
  const MAP_PREFIX = '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5';
  let query = {
    "v": 3, "q": {
      "find": {
        // ToDo - Find MAP SET 'app' 'tonicpow'
        'out.s7': MAP_PREFIX,
        'out.s8': 'app',
        'out.s9': 'tonicpow'
      } 
    }
  };

  // Encode it in base64 format
  let b64 = btoa(JSON.stringify(query));

  // Subscribe
  let bitSocket = new EventSource('https://babel.bitdb.network/s/1DHDifPvtPgKFPZMRSxmVHhiPvFmxZwbfh/'+b64);

  // Event handler
  bitSocket.onmessage = function(e) {
    console.log(e.data)
  }
}

// iframeLoader() - replaces each tonic div with a corresponding iframe
function iframeLoader() {

  //Set config
  const networkUrl = "https://app.tonicpow.com";              // Url for Tonic App
  const footerLinkHeight = 22;                                // Size for the footer link area
  const defaultHeight = 250;                                  // Height of the embed
  const defaultWidth = 300;                                   // Width of the embed
  const defaultRatePerBlock = 546;                            // Default rate of sats per block
  const defaultUnitId = "embed-1";                            // Default unit-id to use if not set
  const defaultPubKey = "1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD"; // Default pubkey to set if not found

  // Get sticker address from parent page
  let stickerAddress = (document.head.querySelector("[name=bitcoin-address][content]")) ? document.head.querySelector("[name=bitcoin-address][content]").content : "";

  // Get sticker tx from parent page
  let stickerTx = (document.head.querySelector("[name=bitcoin-tx][content]")) ? document.head.querySelector("[name=bitcoin-tx][content]").content : "";

  // Get query params from parent page / url
  let affiliate = getUrlParameter("affiliate");

  // Convert affiliate if $handcash detected
  affiliate = (affiliate.includes('$')) ? handCashLookup(affiliate) : affiliate;

  // Get all tonic divs
  let tonicDivs = document.getElementsByClassName("tonic");
  if (!tonicDivs || tonicDivs.length === 0) {
    console.error("no tonic divs found with class tonic");
    return; // No need to go further
  }

  // Connect socket now that we have tonic divs
  connectBitSocket();

  // Loop all ad divs that we found
  for (let i = tonicDivs.length - 1; i >= 0; i--) {

    // Got a width size?
    let displayWidth = tonicDivs[i].getAttribute('data-width');
    if (!displayWidth || displayWidth === "") {
      displayWidth = defaultWidth;
    }

    // Got a height size?
    let displayHeight = tonicDivs[i].getAttribute('data-height');
    if (!displayHeight || displayHeight === "") {
      displayHeight = defaultHeight;
    }

    // Get data-unit-id
    let dataUnitId = tonicDivs[i].getAttribute('data-unit-id');
    if (!dataUnitId || dataUnitId === "") {
      console.log("data-unit-id not found, using default: " + defaultUnitId);
      dataUnitId = defaultUnitId;
    }
    
    // Get data-pubkey
    let dataPubKey = tonicDivs[i].getAttribute('data-pubkey');
    if (!dataPubKey || dataPubKey === "") {
      console.log("data-pubkey not found, using default: " + defaultPubKey);
      dataPubKey = defaultPubKey;
    }
    
    // Convert pubkey if needed
    dataPubKey = (dataPubKey.includes('$')) ? handCashLookup(dataPubKey) : dataPubKey;
    
    // Got a state to load by default
    let loadState = tonicDivs[i].getAttribute('data-state');
    if (!loadState || loadState === "") {
      loadState = "";
    }

    // Got a default rate?
    let rate = tonicDivs[i].getAttribute('data-rate');
    if (!rate || rate === "") {
      rate = defaultRatePerBlock;
    }

    // Got a default image url?
    let imageUrl = tonicDivs[i].getAttribute('data-image');
    if (!imageUrl || imageUrl === "") {
      imageUrl = "";
    }

    // Build the iframe, pass along configuration variables
    let iframe = document.createElement('iframe');
    iframe.src = networkUrl + "/"+loadState+"?" +
      "unit_id=" + dataUnitId +
      "&pubkey=" + dataPubKey +
      "&affiliate=" + affiliate +
      "&sticker_address=" + stickerAddress +
      "&sticker_tx=" + stickerTx +
      "&rate=" + rate +
      "&width=" + displayWidth +
      "&height=" + displayHeight +
      "&image=" + imageUrl +
      "cache=" + Math.random();
    iframe.width = displayWidth;
    iframe.height = (parseInt(displayHeight) + footerLinkHeight);

    // Add the data to the iframe
    iframe.setAttribute("data-unit-id", dataUnitId);
    iframe.setAttribute("data-pubkey", dataPubKey);
    iframe.setAttribute("data-affiliate", affiliate);
    iframe.setAttribute("data-sticker-address", stickerAddress);

    // Extra attributes
    // iframe.allowfullscreen = true;
    // iframe.allowpaymentrequest = true;
    // iframe.referrerpolicy = "unsafe-url";
    // iframe.scrolling = "no"; (this stops scrolling as well

    // Name and border
    iframe.importance = "high";
    iframe.name = "tonic_"+dataUnitId;
    iframe.frameBorder = "0";
    iframe.style.border="none";
    iframe.style.overflow="hidden"; // (app should take care of this)

    // Replace the div for the iframe
    tonicDivs[i].parentNode.replaceChild(iframe, tonicDivs[i]);
    console.log("tonic campaign loaded - unit_id: " + dataUnitId);
  }
}

// handCashLookup() - looks up a handle and returns an address
function handCashLookup(handle) {

  // Config
  let walletAddress = "";

  // No handle or invalid
  if (!handle || !handle.includes('$')) {
    console.error("invalid handcash handle: " + handle);
    return "";
  }

  // Did we already look this up?
  walletAddress = localStorage.getItem(handle);
  console.log(walletAddress);
  if  (walletAddress !== null && walletAddress.length >= 34 && walletAddress.startsWith('1')) {
    console.log("handcash found locally, skipping lookup! " + handle + ":" + walletAddress);
    return walletAddress;
  }

  // lookup handcash
  try {

    console.log("fetching handcash handle: "+handle);

    // Setup the request
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.handcash.io/api/receivingAddress/' + handle.substr(1), true);

    // Onload
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {

        // Success!
        let data = JSON.parse(request.responseText);

        // Got our bitcoin address?
        if(data.hasOwnProperty('receivingAddress')){
          walletAddress = data.receivingAddress;
          localStorage.setItem(handle,walletAddress);
          return walletAddress;
        }
      } else {
        // We reached our target server, but it returned an error
        console.error(request);
        return "";
      }
    };

    // On error
    request.onerror = function() {
      // There was a connection error of some sort
      console.error(request);
      return "";
    };

    // Send the GET request
    request.send();

  } catch (e) {
    console.error('issue getting handcash handle', e);
    return "";
  }
}

// Source: https://davidwalsh.name/query-string-javascript
// getUrlParameter()
// @param name is the name of the query parameter
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}