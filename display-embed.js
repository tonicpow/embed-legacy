// On complete / interactive or if DOM loaded
if(document.readyState === "complete" || document.readyState === "interactive") {
  loadIframe();
  connectBitsocket();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    loadIframe();
  });
}

function connectBitsocket () {
  // Write a bitquery
  const MAP_PREFIX = '1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5'
  let query = {
    "v": 3, "q": {
      "find": {
        // ToDo - Find MAP SET 'app' 'tonicpow'
        'out.s7': MAP_PREFIX,
        'out.s8': 'app',
        'out.s9': 'tonicpow'
      } 
    }
  }

  // Encode it in base64 format
  let b64 = btoa(JSON.stringify(query))

  // Subscribe
  let bitsocket = new EventSource('https://babel.bitdb.network/s/1DHDifPvtPgKFPZMRSxmVHhiPvFmxZwbfh/'+b64)

  // Event handler
  bitsocket.onmessage = function(e) {
    console.log(e.data)
  }
}

// loadIframe() - replaces each tonic div with a corresponding iframe
function loadIframe() {

  //Set config
  const networkUrl = "https://app.tonicpow.com";              // Url for Tonic App
  const footerLinkHeight = 22;                                // Size for the footer link area
  const defaultHeight = 250;                                  // Height of the embed
  const defaultWidth = 300;                                   // Width of the embed
  const defaultRatePerBlock = 1;                              // Default rate per block
  const defaultUnitId = "embed-1";                            // Default unit-id to use if not set
  const defaultPubKey = "1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD"; // Default pubkey to set if not found

  // Get sticker address from parent page
  let stickerAddress = (document.head.querySelector("[name=bitcoin-address][content]")) ? document.head.querySelector("[name=bitcoin-address][content]").content : "";

  // Get sticker tx from parent page
  let stickerTx = (document.head.querySelector("[name=bitcoin-tx][content]")) ? document.head.querySelector("[name=bitcoin-tx][content]").content : "";

  // Get query params from parent page / url
  let affiliate = getUrlParameter("affiliate");

  // Get all tonic divs
  let tonicDivs = document.getElementsByClassName("tonic");
  if (!tonicDivs || tonicDivs.length === 0) {
    console.error("no tonic divs found with class tonic");
    return; // No need to go further
  }

  // Collection of unit ids displayed
  // let unitIds = [];

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
      //createErrorMessage("missing data-unit-id", tonicDivs[i], displayWidth, displayHeight);
      //continue; // keep trying to load other ads
    }

    // @mrz turned off - this is a feature, not a bug/error
    // Detect unit-id already used
    //if (unitIds.indexOf(dataUnitId) > -1) {
    //  createErrorMessage("data-unit-id was already previously used", tonicDivs[i], displayWidth, displayHeight);
    //  continue; // keep trying to load other ads
    //} else {
    //  unitIds.push(dataUnitId);
    //}
    
    // Get data-pubkey
    let dataPubKey = tonicDivs[i].getAttribute('data-pubkey');
    if (!dataPubKey || dataPubKey === "") {
      console.log("data-pubkey not found, using default: " + defaultPubKey);
      dataPubKey = defaultPubKey;
      //createErrorMessage("missing data-pubkey", tonicDivs[i], displayWidth, displayHeight);
      //continue; // keep trying to load other ads
    }
    
    // Got a state to load by default
    let loadState = tonicDivs[i].getAttribute('data-state');
    if (!loadState || loadState === "") {
      loadState = "";
    }

    // Got a default rate
    let rate = tonicDivs[i].getAttribute('data-rate');
    if (!rate || rate === "") {
      rate = defaultRatePerBlock;
    }

    // Build the iframe, pass along configuration variables
    let iframe = document.createElement('iframe');
    iframe.src = networkUrl + "/"+loadState+"?unit_id=" + dataUnitId + "&pubkey=" + dataPubKey + "&affiliate=" + affiliate + "&sticker_address=" + stickerAddress + "&sticker_tx=" + stickerTx + "&rate=" + rate + "&cache=" + Math.random();
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

// createErrorMessage()
// @param message is the error message to display
// @param tonicDiv is the div element to replace with this error div
// @param width is the width of the error div
// @param height is the height of the error div
/*function createErrorMessage(message, tonicDiv, width, height) {
  // Create the div
  let errorDiv = document.createElement('div');
  errorDiv.style.textAlign = "center";
  errorDiv.style.width = width + "px";
  errorDiv.style.height = height + "px";
  errorDiv.style.paddingTop = "40px";
  errorDiv.style.border = "1px solid red";

  // Set the html
  errorDiv.innerHTML =
    '<p style="font-weight:bold;color:red;font-size:20px;">' + message + '</p>';

  // Replace the div for the error div
  tonicDiv.parentNode.replaceChild(errorDiv, tonicDiv);

  // Show error to developer
  console.error("displayed error: " + message);
}*/

// Source: https://davidwalsh.name/query-string-javascript
// getUrlParameter()
// @param name is the name of the query parameter
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}