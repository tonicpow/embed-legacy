document.addEventListener("DOMContentLoaded", function(){
  // Get sticker
  // let stickerAddress = document.head.querySelector("[name=bitcoin-address][content]").content;

  // Get query params
  //let affiliate = getUrlParameter(affiliate)

  // Get all tonic divs
  let ads = document.getElementsByClassName("tonic");
  if (ads.length === 0) {
    console.log("no ad-divs found with class tonic");
  }

  for (let i = ads.length - 1; i >= 0; i--)
  {
    ads[i].setAttribute('data-iframe', 'found');

    let iframe = document.createElement('iframe');
    iframe.src = "https://tonicpow.firebase.com";


    ads[i].parentNode.replaceChild(iframe, ads[i]);
  }
});

// Source: https://davidwalsh.name/query-string-javascript
// getUrlParameter()
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}