document.addEventListener("DOMContentLoaded", function(){
  loadIframe();
});

// loadIframe - loads the iframes in place of divs for ad-embed
function loadIframe(){

  //Set config
  let adNetworkUrl = "https://tonicpow.firebaseapp.com";

  // Get sticker from parent page
  let stickerAddress = document.head.querySelector("[name=bitcoin-address][content]").content;

  // Get query params from parent page / url
  let affiliate = getUrlParameter("affiliate");

  // Get all tonic divs
  let ads = document.getElementsByClassName("tonic");
  if (ads.length === 0) {
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

    // Build the iframe, pass along configuration variables
    let iframe = document.createElement('iframe');
    iframe.src = adNetworkUrl+"/?unit_id="+dataUnitId+"&pubkey="+dataPubKey+"&affiliate="+affiliate+"&sticker_address="+stickerAddress;

    // Replace the div for the iframe
    ads[i].parentNode.replaceChild(iframe, ads[i]);
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