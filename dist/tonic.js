!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);const n={removeStorage:e=>{try{localStorage.removeItem(e),localStorage.removeItem(e+"_expiresIn")}catch(t){return console.log("removeStorage: Error removing key ["+e+"] from localStorage: "+JSON.stringify(t)),!1}return!0},getStorage:e=>{let t=Date.now(),o=localStorage.getItem(e+"_expires");if(null==o&&(o=0),o<t)return n.removeStorage(e),null;try{return localStorage.getItem(e)}catch(t){return console.log("getStorage: Error reading key ["+e+"] from localStorage: "+JSON.stringify(t)),null}},setStorage:(e,t,o=null)=>{o=o?Math.abs(o):86400;let n=Date.now()+1e3*o;try{localStorage.setItem(e,t),localStorage.setItem(e+"_expires",n.toString())}catch(t){return console.log("setStorage: Error setting key ["+e+"] in localStorage: "+JSON.stringify(t)),!1}return!0}};var r=n;const a={lookup:async e=>{if(!e||!e.includes("$"))return console.error("invalid handcash handle: "+e),"";let t=r.getStorage(e);if(null!==t&&t.length>25)return console.log("handcash found locally, skipping lookup! "+e+":"+t),t;try{let o=e.replace("$","")+"@handcash.io",n=await Promise.all([fetch("https://api.polynym.io/getAddress/"+o).then(e=>e.json())]);return"object"==typeof n&&n[0]&&n[0].hasOwnProperty("address")?(t=n[0].address,t.length>25?(r.setStorage(e,t,7200),t):(console.log("receivingAddress was invalid:",t,n),"")):(console.log("Polynym response was invalid or missing address",n),"")}catch(t){return console.log(t,e),""}}};var i=a;const s={lookup:async e=>{if(!e||!e.includes("@")||!e.includes("."))return console.error("invalid paymail address: "+e),"";let t=r.getStorage(e);if(null!==t&&t.length>25)return console.log("paymail found locally, skipping lookup! "+e+":"+t),t;try{let o=await Promise.all([fetch("https://api.polynym.io/getAddress/"+e).then(e=>e.json())]);return"object"==typeof o&&o[0]&&o[0].hasOwnProperty("address")?(t=o[0].address,t.length>25?(r.setStorage(e,t,7200),t):(console.log("receivingAddress was invalid:",t,o),"")):(console.log("Polynym response was invalid or missing address",o),"")}catch(t){return console.log(t,e),""}}};var l=s;const d={lookup:async e=>{if(!e||"1"!==e.charAt(0))return console.error("invalid relay handle: "+e),"";let t=r.getStorage(e);if(null!==t&&t.length>25)return console.log("relay found locally, skipping lookup! "+e+":"+t),t;try{let o=await Promise.all([fetch("https://relayx.io/api/receivingAddress/"+e).then(e=>e.json())]);return"object"==typeof o&&o[0]&&o[0].hasOwnProperty("receivingAddress")?(t=o[0].receivingAddress,t.length>25?(r.setStorage(e,t,7200),t):(console.log("receivingAddress was invalid:",t,o),"")):(console.log("relay response was invalid or missing receivingAddress",o),"")}catch(t){return console.log(t,e),""}}};var c=d;var g=class{constructor(e){for(let t in e)this[t]=e[t]}static get schema(){return{B:{},MAP:{},in:[]}}get bImgDataSrc(){if(this.B&&"binary"===this.B.encoding)return"data:"+this.B["content-type"]+";base64, "+this.B.content}get adType(){return this.MAP&&this.MAP.ad_type&&"funding"===this.MAP.ad_type?"funding":"display"}get ctaUrl(){if(this.MAP&&this.MAP.cta_url)return this.MAP.cta_url}get ctaText(){return this.MAP&&this.MAP.cta_text?this.MAP.cta_text:"Donate"}get affiliateAddress(){if(this.MAP&&this.MAP.affiliate_address&&"00"!==this.MAP.affiliate_address)return this.MAP.affiliate_address}get currency(){return this.MAP&&this.MAP.currency?this.MAP.currency:"usd"}get firstVinAddress(){if(this.in&&this.in[0]&&this.in[0].e.a)return this.in[0].e.a}};let u={};u.Storage=r,u.Paymail=l,u.Handcash=i,u.Relay=c,u.Tonic=g,u.Iframes=new Map;u.setOreo=(e,t,o)=>{let n=new Date;n.setTime(n.getTime()+864e5*o),document.cookie=e+"="+t+";path=/;expires="+n.toGMTString()},u.captureVisitorSession=(e="")=>{let t=e;if((!e||0===e.length)&&"undefined"!=typeof window){t=new URLSearchParams(window.location.search).get("tncpw_session")}t&&t.length>0&&(u.setOreo("tncpw_session",t,60),u.Storage.setStorage("tncpw_session",t,5184e3))},u.getVisitorSession=()=>u.Storage.getStorage("tncpw_session"),u.iframeLoader=async()=>{if("undefined"==typeof window)return void console.error("TonicPow embed only works in the browser");const e=["bsv","usd"];let t=document.head.querySelector("[name=bitcoin-address][content]")?document.head.querySelector("[name=bitcoin-address][content]").content:"",o=(document.head.querySelector("[name=bitcoin-tx][content]")&&document.head.querySelector("[name=bitcoin-tx][content]").content,new URLSearchParams(window.location.search).get("affiliate"));o&&(o.includes("$")&&(o=o.replace("$","")+"@handcash.io"),o=o.includes("@")?await l.lookup(o):o,o="1"===o.charAt(0)&&o.length<25?await c.lookup(o):o,(void 0===o||!o||""===o||o.length<=25)&&(console.error("failed to set affiliate",o),o=""));let n=document.getElementsByClassName("tonic");if(n&&0!==n.length){for(let a=n.length-1;a>=0;a--){let i=n[a],s=i.getAttribute("data-width");s&&""!==s||(s=300);let d=i.getAttribute("data-height");d&&""!==d||(d=250);let g=i.getAttribute("data-unit-id");g&&""!==g||(console.log("data-unit-id not found, using default: embed-1"),g="embed-1");let h=i.getAttribute("data-address"),f=i.getAttribute("data-handcash"),p="";f&&f.includes("$")?(p=p.replace("$","")+"@handcash.io",p=await l.lookup(f),void 0===p||!p||""===p||p.length<=25?p="":h=p):f="";let y=i.getAttribute("data-relayx"),m="";y&&"1"===y.charAt(0)?(m=await c.lookup(y),void 0===m||!m||""===m||m.length<=25?m="":h=m):y="";let w=i.getAttribute("data-paymail"),S="";w&&w.includes("@")?(S=await l.lookup(w),void 0===S||!S||""===S||S.length<=25?S="":h=S):w="",(void 0===h||!h||h.length<=25)&&(t?(h=t,console.log("data-address not found or invalid: "+h+" using sticker address: "+t+" tonic-id: "+g)):(h="1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD",console.log("data-address not found or invalid: "+h+" using default address: 1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD tonic-id: "+g)));let v=r.getStorage("affiliate_"+h);v?(o=v,console.log("existing affiliate found in local storage: "+o)):o&&(r.setStorage("affiliate_"+h,o,5184e3),console.log("saving new affiliate in local storage: "+o));let A=i.getAttribute("data-rate");A&&""!==A||(A=546);let b=i.getAttribute("data-image");b&&""!==b||(b="");let P=i.getAttribute("data-url");P&&""!==P||(P="");let M=i.getAttribute("data-link-color");M&&""!==M?(M=M.replace(/[^a-zA-Z]+/g,""),6!==M.length&&3!==M.length&&(M="")):M="";let k=i.getAttribute("data-currency");k&&""!==k?-1===e.indexOf(k)&&(k="bsv",A=546):k="bsv",k=k.toLowerCase();let _=document.createElement("div"),x=await fetch("https://api.staging.tonicpow.com/v1/widgets/display/"+g),O=await x.json();_.innerHTML=`\n      <a href="${O.link_url}">\n        <img src="${O.image_url}" width="${O.width}" height="${O.height}" alt="Alt text" />\n      </a>\n    `,_.setAttribute("data-unit-id",g),u.Iframes.set(g,h),i.parentNode.replaceChild(_,i)}console.log("Tonic Map:",u.Iframes)}else console.info("no tonic divs found with class 'tonic'")},u.load=()=>{if("undefined"==typeof window)return void console.error("TonicPow embed only works in the browser");let e=document.getElementsByClassName("tonic");e&&e.length>0&&u.iframeLoader().then(e=>{}),u.captureVisitorSession()},"complete"===document.readyState||"interactive"===document.readyState?(u.load(),console.log("loaded via document.readyState")):document.addEventListener("DOMContentLoaded",(function(){u.load(),console.log("loaded via DOMContentLoaded")})),"undefined"!=typeof window&&(window.TonicPow=u)}]);