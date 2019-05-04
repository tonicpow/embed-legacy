// On complete / interactive or if DOM loaded
if(document.readyState === "complete" || document.readyState === "interactive") {
  loadIframe();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    loadIframe();
  });
}

// loadIframe - replaces each tonic div with a corresponding iframe
function loadIframe() {

  //Set config
  const networkUrl = "https://app.tonicpow.com";
  const footerLinkHeight = 22;
  const defaultHeight = 250;
  const defaultWidth = 300;
  const defaultRatePerBlock = 1;

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

  // Loop all ad divs that we found
  for (let i = tonicDivs.length - 1; i >= 0; i--) {

    // Get data-unit-id
    let dataUnitId = tonicDivs[i].getAttribute('data-unit-id');
    if (!dataUnitId || dataUnitId === "") {
      console.error("missing data-unit-id");
      continue; // keep trying to load other ads
    }

    // Get data-pubkey
    let dataPubKey = tonicDivs[i].getAttribute('data-pubkey');
    if (!dataPubKey || dataPubKey === "") {
      console.error("missing data-pubkey");
      continue; // keep trying to load other ads
    }

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

// Source: https://davidwalsh.name/query-string-javascript
// getUrlParameter()
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}