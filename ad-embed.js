// On complete / interactive or if DOM loaded
if(document.readyState === "complete" || document.readyState === "interactive") {
  loadIframe();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    loadIframe();
  });
}

// loadIframe - replaces each tonicpow div with a corresponding iframe
function loadIframe() {

  //Set config
  let adNetworkUrl = "https://app.tonicpow.com";

  // Get sticker address from parent page
  let stickerAddress = (document.head.querySelector("[name=bitcoin-address][content]")) ? document.head.querySelector("[name=bitcoin-address][content]").content : "";

  // Get sticker tx from parent page
  let stickerTx = (document.head.querySelector("[name=bitcoin-tx][content]")) ? document.head.querySelector("[name=bitcoin-tx][content]").content : "";

  // Get query params from parent page / url
  let affiliate = getUrlParameter("affiliate");

  // Get all tonic divs
  let ads = document.getElementsByClassName("tonic");
  if (!ads || ads.length === 0) {
    console.error("no ad-divs found with class tonic");
    return;
  }

  // Loop all ad divs that we found
  for (let i = ads.length - 1; i >= 0; i--) {

    // Get data-unit-id
    let dataUnitId = ads[i].getAttribute('data-unit-id');
    if (!dataUnitId || dataUnitId === "") {
      console.error("missing data-unit-id");
      return;
    }

    // Get data-pubkey
    let dataPubKey = ads[i].getAttribute('data-pubkey');
    if (!dataPubKey || dataPubKey === "") {
      console.error("missing data-pubkey");
      return;
    }

    // Got a width size?
    let adWidth = ads[i].getAttribute('data-width');
    if (!adWidth || adWidth === "") {
      adWidth = "300";
    }

    // Got a height size?
    let adHeight = ads[i].getAttribute('data-height');
    if (!adHeight || adHeight === "") {
      adHeight = "250";
    }

    // Build the iframe, pass along configuration variables
    let iframe = document.createElement('iframe');
    iframe.src = adNetworkUrl + "/?unit_id=" + dataUnitId + "&pubkey=" + dataPubKey + "&affiliate=" + affiliate + "&sticker_address=" + stickerAddress + "&sticker_tx=" + stickerTx;
    iframe.width = adWidth;
    iframe.height = adHeight;

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
    iframe.name = "iframe_"+dataUnitId;
    iframe.frameBorder = "0";
    iframe.style.border="none";
    iframe.style.overflow="hidden"; // (app should take care of this)


    // Replace the div for the iframe
    ads[i].parentNode.replaceChild(iframe, ads[i]);
    console.log("Ad Displayed! unit_id: " + dataUnitId);
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