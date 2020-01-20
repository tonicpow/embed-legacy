!function(e){var t={};function a(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(r,o,function(t){return e[t]}.bind(null,o));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);var r=class{constructor(e){for(let t in e)this[t]=e[t]}static get schema(){return{B:{},MAP:{},in:[]}}get bImgDataSrc(){if(this.B&&"binary"===this.B.encoding)return"data:"+this.B["content-type"]+";base64, "+this.B.content}get adType(){return this.MAP&&this.MAP.ad_type&&"funding"===this.MAP.ad_type?"funding":"display"}get ctaUrl(){if(this.MAP&&this.MAP.cta_url)return this.MAP.cta_url}get ctaText(){return this.MAP&&this.MAP.cta_text?this.MAP.cta_text:"Donate"}get affiliateAddress(){if(this.MAP&&this.MAP.affiliate_address&&"00"!==this.MAP.affiliate_address)return this.MAP.affiliate_address}get currency(){return this.MAP&&this.MAP.currency?this.MAP.currency:"usd"}get firstVinAddress(){if(this.in&&this.in[0]&&this.in[0].e.a)return this.in[0].e.a}};const o={removeStorage:e=>{try{localStorage.removeItem(e),localStorage.removeItem(e+"_expiresIn")}catch(t){return console.log("removeStorage: Error removing key ["+e+"] from localStorage: "+JSON.stringify(t)),!1}return!0},getStorage:e=>{let t=Date.now(),a=localStorage.getItem(e+"_expires");if(null==a&&(a=0),a<t)return o.removeStorage(e),null;try{return localStorage.getItem(e)}catch(t){return console.log("getStorage: Error reading key ["+e+"] from localStorage: "+JSON.stringify(t)),null}},setStorage:(e,t,a=null)=>{a=a?Math.abs(a):86400;let r=Date.now()+1e3*a;try{localStorage.setItem(e,t),localStorage.setItem(e+"_expires",r)}catch(t){return console.log("setStorage: Error setting key ["+e+"] in localStorage: "+JSON.stringify(t)),!1}return!0}};var n=o;const i={lookup:async e=>{if(!e||!e.includes("$"))return console.error("invalid handcash handle: "+e),"";let t=n.getStorage(e);if(null!==t&&t.length>25)return console.log("handcash found locally, skipping lookup! "+e+":"+t),t;try{let a=await Promise.all([fetch("https://api.handcash.io/api/receivingAddress/"+e.substr(1)).then(e=>e.json())]);return"object"==typeof a&&a[0]&&a[0].hasOwnProperty("receivingAddress")?(t=a[0].receivingAddress,t.length>25?(n.setStorage(e,t,7200),t):(console.log("receivingAddress was invalid:",t,a),"")):(console.log("handcash response was invalid or missing receivingAddress",a),"")}catch(t){return console.log(t,e),""}}};var l=i;const s={lookup:async e=>{if(!e||"1"!==e.charAt(0))return console.error("invalid relay handle: "+e),"";let t=n.getStorage(e);if(null!==t&&t.length>25)return console.log("relay found locally, skipping lookup! "+e+":"+t),t;try{let a=await Promise.all([fetch("https://relayx.io/api/receivingAddress/"+e).then(e=>e.json())]);return"object"==typeof a&&a[0]&&a[0].hasOwnProperty("receivingAddress")?(t=a[0].receivingAddress,t.length>25?(n.setStorage(e,t,7200),t):(console.log("receivingAddress was invalid:",t,a),"")):(console.log("relay response was invalid or missing receivingAddress",a),"")}catch(t){return console.log(t,e),""}}};var d=s;const c={lookup:async e=>{if(!e||!e.includes("@")||!e.includes("."))return console.error("invalid paymail address: "+e),"";let t=n.getStorage(e);if(null!==t&&t.length>25)return console.log("paymail found locally, skipping lookup! "+e+":"+t),t;try{let a=await Promise.all([fetch("https://api.polynym.io/getAddress/"+e).then(e=>e.json())]);return"object"==typeof a&&a[0]&&a[0].hasOwnProperty("address")?(t=a[0].address,t.length>25?(n.setStorage(e,t,7200),t):(console.log("receivingAddress was invalid:",t,a),"")):(console.log("Polynym response was invalid or missing address",a),"")}catch(t){return console.log(t,e),""}}};var u=c;let g={};g.Storage=n,g.Handcash=l,g.Relay=d,g.Paymail=u,g.Tonic=r,g.Iframes=new Map,g.iframeLoader=async()=>{const e=["bsv","usd"];let t=document.head.querySelector("[name=bitcoin-address][content]")?document.head.querySelector("[name=bitcoin-address][content]").content:"",a=document.head.querySelector("[name=bitcoin-tx][content]")?document.head.querySelector("[name=bitcoin-tx][content]").content:"",r=new URLSearchParams(window.location.search).get("affiliate");r&&(r.includes("$")&&(r=r.replace("$","")+"@handcash.io"),r=r.includes("@")?await u.lookup(r):r,r="1"===r.charAt(0)&&r.length<25?await d.lookup(r):r,(void 0===r||!r||""===r||r.length<=25)&&(console.error("failed to set affiliate",r),r=""));let o=document.getElementsByClassName("tonic");if(o&&0!==o.length){for(let n=o.length-1;n>=0;n--){let i=o[n],l=i.getAttribute("data-width");l&&""!==l||(l=300);let s=i.getAttribute("data-height");s&&""!==s||(s=250);let c=i.getAttribute("data-unit-id");c&&""!==c||(console.log("data-unit-id not found, using default: embed-1"),c="embed-1");let h=i.getAttribute("data-address"),f=i.getAttribute("data-handcash"),p="";f&&f.includes("$")?(p=p.replace("$","")+"@handcash.io",p=await u.lookup(f),void 0===p||!p||""===p||p.length<=25?p="":h=p):f="";let y=i.getAttribute("data-relayx"),m="";y&&"1"===y.charAt(0)?(m=await d.lookup(y),void 0===m||!m||""===m||m.length<=25?m="":h=m):y="";let A=i.getAttribute("data-paymail"),b="";A&&A.includes("@")?(b=await u.lookup(A),void 0===b||!b||""===b||b.length<=25?b="":h=b):A="",(void 0===h||!h||h.length<=25)&&(t?(h=t,console.log("data-address not found or invalid: "+h+" using sticker address: "+t+" tonic-id: "+c)):(h="1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD",console.log("data-address not found or invalid: "+h+" using default address: 1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD tonic-id: "+c)));let v=localStorage.getItem("affiliate_"+h);v?(r=v,console.log("existing affiliate found in local storage: "+r)):r&&(localStorage.setItem("affiliate_"+h,r),console.log("saving new affiliate in local storage: "+r));let S=i.getAttribute("data-rate");S&&""!==S||(S=546);let w=i.getAttribute("data-image");w&&""!==w||(w="");let P=i.getAttribute("data-url");P&&""!==P||(P="");let k=i.getAttribute("data-link-color");k&&""!==k?(k=k.replace(/[^a-zA-Z]+/g,""),6!==k.length&&3!==k.length&&(k="")):k="";let M=i.getAttribute("data-currency");M&&""!==M?-1===e.indexOf(M)&&(M="bsv",S=546):M="bsv",M=M.toLowerCase();let _=document.createElement("iframe");_.src="https://app.tonicpow.com/?unit_id="+c+"&address="+h+(r?"&affiliate="+r:"")+(t?"&sticker_address="+t:"")+(a?"&sticker_tx="+a:"")+"&rate="+S+"&currency="+M+"&width="+l+"&height="+s+(w?"&image="+w:"")+(P?"&url="+P:"")+(k?"&link_color="+k:"")+"&cache="+Math.random(),_.width=l,_.height=parseInt(s)+28,_.id="tonic_"+c,_.setAttribute("scrolling","no"),_.setAttribute("data-address",h),_.setAttribute("data-handcash",f),_.setAttribute("data-paymail",A),_.setAttribute("data-image",w),_.setAttribute("data-link-color",k),_.setAttribute("data-relayx",y),_.setAttribute("data-sticker-address",t),_.setAttribute("data-sticker-tx",a),_.setAttribute("data-unit-id",c),_.setAttribute("data-url",P),r&&_.setAttribute("data-affiliate",r),_.importance="high",_.frameBorder="0",_.style.border="none",_.style.overflow="hidden",_.style.backgroundColor="transparent",_.allowTransparency="true",g.Iframes.set(c,h),i.parentNode.replaceChild(_,i)}console.log("Tonic Map:",g.Iframes)}else console.info("no tonic divs found with class 'tonic'")},g.load=()=>{g.iframeLoader();fetch("https://b.map.sv/ping/").then(e=>e.json()).then(async e=>{})},"complete"===document.readyState||"interactive"===document.readyState?(g.load(),console.log("loaded via document.readyState")):document.addEventListener("DOMContentLoaded",(function(){g.load(),console.log("loaded via DOMContentLoaded")})),window.TonicPow=g}]);