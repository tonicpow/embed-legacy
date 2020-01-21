!function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);var r=class{constructor(e){for(let t in e)this[t]=e[t]}static get schema(){return{B:{},MAP:{},in:[]}}get bImgDataSrc(){if(this.B&&"binary"===this.B.encoding)return"data:"+this.B["content-type"]+";base64, "+this.B.content}get adType(){return this.MAP&&this.MAP.ad_type&&"funding"===this.MAP.ad_type?"funding":"display"}get ctaUrl(){if(this.MAP&&this.MAP.cta_url)return this.MAP.cta_url}get ctaText(){return this.MAP&&this.MAP.cta_text?this.MAP.cta_text:"Donate"}get affiliateAddress(){if(this.MAP&&this.MAP.affiliate_address&&"00"!==this.MAP.affiliate_address)return this.MAP.affiliate_address}get currency(){return this.MAP&&this.MAP.currency?this.MAP.currency:"usd"}get firstVinAddress(){if(this.in&&this.in[0]&&this.in[0].e.a)return this.in[0].e.a}};const n={removeStorage:e=>{try{localStorage.removeItem(e),localStorage.removeItem(e+"_expiresIn")}catch(t){return console.log("removeStorage: Error removing key ["+e+"] from localStorage: "+JSON.stringify(t)),!1}return!0},getStorage:e=>{let t=Date.now(),o=localStorage.getItem(e+"_expires");if(null==o&&(o=0),o<t)return n.removeStorage(e),null;try{return localStorage.getItem(e)}catch(t){return console.log("getStorage: Error reading key ["+e+"] from localStorage: "+JSON.stringify(t)),null}},setStorage:(e,t,o=null)=>{o=o?Math.abs(o):86400;let r=Date.now()+1e3*o;try{localStorage.setItem(e,t),localStorage.setItem(e+"_expires",r.toString())}catch(t){return console.log("setStorage: Error setting key ["+e+"] in localStorage: "+JSON.stringify(t)),!1}return!0}};var a=n;const i={lookup:async e=>{if(!e||!e.includes("$"))return console.error("invalid handcash handle: "+e),"";let t=a.getStorage(e);if(null!==t&&t.length>25)return console.log("handcash found locally, skipping lookup! "+e+":"+t),t;try{let o=e.replace("$","")+"@handcash.io",r=await Promise.all([fetch("https://api.polynym.io/getAddress/"+o).then(e=>e.json())]);return"object"==typeof r&&r[0]&&r[0].hasOwnProperty("address")?(t=r[0].address,t.length>25?(a.setStorage(e,t,7200),t):(console.log("receivingAddress was invalid:",t,r),"")):(console.log("Polynym response was invalid or missing address",r),"")}catch(t){return console.log(t,e),""}}};var s=i;const l={lookup:async e=>{if(!e||"1"!==e.charAt(0))return console.error("invalid relay handle: "+e),"";let t=a.getStorage(e);if(null!==t&&t.length>25)return console.log("relay found locally, skipping lookup! "+e+":"+t),t;try{let o=await Promise.all([fetch("https://relayx.io/api/receivingAddress/"+e).then(e=>e.json())]);return"object"==typeof o&&o[0]&&o[0].hasOwnProperty("receivingAddress")?(t=o[0].receivingAddress,t.length>25?(a.setStorage(e,t,7200),t):(console.log("receivingAddress was invalid:",t,o),"")):(console.log("relay response was invalid or missing receivingAddress",o),"")}catch(t){return console.log(t,e),""}}};var d=l;const c={lookup:async e=>{if(!e||!e.includes("@")||!e.includes("."))return console.error("invalid paymail address: "+e),"";let t=a.getStorage(e);if(null!==t&&t.length>25)return console.log("paymail found locally, skipping lookup! "+e+":"+t),t;try{let o=await Promise.all([fetch("https://api.polynym.io/getAddress/"+e).then(e=>e.json())]);return"object"==typeof o&&o[0]&&o[0].hasOwnProperty("address")?(t=o[0].address,t.length>25?(a.setStorage(e,t,7200),t):(console.log("receivingAddress was invalid:",t,o),"")):(console.log("Polynym response was invalid or missing address",o),"")}catch(t){return console.log(t,e),""}}};var u=c;let g={};g.Storage=a,g.Paymail=u,g.Handcash=s,g.Relay=d,g.Tonic=r,g.Iframes=new Map;g.setOreo=(e,t,o)=>{let r=new Date;r.setTime(r.getTime()+864e5*o),document.cookie=e+"="+t+";path=/;expires="+r.toGMTString()},g.captureVisitorSession=(e="")=>{let t=e;if((!e||0===e.length)&&"undefined"!=typeof window){t=new URLSearchParams(window.location.search).get("tncpw_session")}t&&t.length>0&&((void 0).setOreo("tncpw_session",t,60),(void 0).Storage.setStorage("tncpw_session",t,5184e3))},g.getVisitorSession=()=>(void 0).Storage.getStorage("tncpw_session"),g.iframeLoader=async()=>{if("undefined"==typeof window)return void console.error("TonicPow embed only works in the browser");const e=["bsv","usd"];let t=document.head.querySelector("[name=bitcoin-address][content]")?document.head.querySelector("[name=bitcoin-address][content]").content:"",o=document.head.querySelector("[name=bitcoin-tx][content]")?document.head.querySelector("[name=bitcoin-tx][content]").content:"",r=new URLSearchParams(window.location.search).get("affiliate");r&&(r.includes("$")&&(r=r.replace("$","")+"@handcash.io"),r=r.includes("@")?await u.lookup(r):r,r="1"===r.charAt(0)&&r.length<25?await d.lookup(r):r,(void 0===r||!r||""===r||r.length<=25)&&(console.error("failed to set affiliate",r),r=""));let n=document.getElementsByClassName("tonic");if(n&&0!==n.length){for(let i=n.length-1;i>=0;i--){let s=n[i],l=s.getAttribute("data-width");l&&""!==l||(l=300);let c=s.getAttribute("data-height");c&&""!==c||(c=250);let h=s.getAttribute("data-unit-id");h&&""!==h||(console.log("data-unit-id not found, using default: embed-1"),h="embed-1");let f=s.getAttribute("data-address"),p=s.getAttribute("data-handcash"),y="";p&&p.includes("$")?(y=y.replace("$","")+"@handcash.io",y=await u.lookup(p),void 0===y||!y||""===y||y.length<=25?y="":f=y):p="";let m=s.getAttribute("data-relayx"),b="";m&&"1"===m.charAt(0)?(b=await d.lookup(m),void 0===b||!b||""===b||b.length<=25?b="":f=b):m="";let v=s.getAttribute("data-paymail"),w="";v&&v.includes("@")?(w=await u.lookup(v),void 0===w||!w||""===w||w.length<=25?w="":f=w):v="",(void 0===f||!f||f.length<=25)&&(t?(f=t,console.log("data-address not found or invalid: "+f+" using sticker address: "+t+" tonic-id: "+h)):(f="1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD",console.log("data-address not found or invalid: "+f+" using default address: 1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD tonic-id: "+h)));let A=a.getStorage("affiliate_"+f);A?(r=A,console.log("existing affiliate found in local storage: "+r)):r&&(a.setStorage("affiliate_"+f,r,5184e3),console.log("saving new affiliate in local storage: "+r));let S=s.getAttribute("data-rate");S&&""!==S||(S=546);let P=s.getAttribute("data-image");P&&""!==P||(P="");let k=s.getAttribute("data-url");k&&""!==k||(k="");let _=s.getAttribute("data-link-color");_&&""!==_?(_=_.replace(/[^a-zA-Z]+/g,""),6!==_.length&&3!==_.length&&(_="")):_="";let M=s.getAttribute("data-currency");M&&""!==M?-1===e.indexOf(M)&&(M="bsv",S=546):M="bsv",M=M.toLowerCase();let x=document.createElement("iframe");x.src="https://app.tonicpow.com/?unit_id="+h+"&address="+f+(r?"&affiliate="+r:"")+(t?"&sticker_address="+t:"")+(o?"&sticker_tx="+o:"")+"&rate="+S+"&currency="+M+"&width="+l+"&height="+c+(P?"&image="+P:"")+(k?"&url="+k:"")+(_?"&link_color="+_:"")+"&cache="+Math.random(),x.width=l,x.height=parseInt(c)+28,x.id="tonic_"+h,x.setAttribute("scrolling","no"),x.setAttribute("data-address",f),x.setAttribute("data-handcash",p),x.setAttribute("data-paymail",v),x.setAttribute("data-image",P),x.setAttribute("data-link-color",_),x.setAttribute("data-relayx",m),x.setAttribute("data-sticker-address",t),x.setAttribute("data-sticker-tx",o),x.setAttribute("data-unit-id",h),x.setAttribute("data-url",k),r&&x.setAttribute("data-affiliate",r),x.importance="high",x.frameBorder="0",x.style.border="none",x.style.overflow="hidden",x.style.backgroundColor="transparent",x.allowTransparency="true",g.Iframes.set(h,f),s.parentNode.replaceChild(x,s)}console.log("Tonic Map:",g.Iframes)}else console.info("no tonic divs found with class 'tonic'")},g.load=()=>{if("undefined"==typeof window)return void console.error("TonicPow embed only works in the browser");let e=document.getElementsByClassName("tonic");if(e&&e.length>0){g.iframeLoader().then(e=>{}),fetch("https://b.map.sv/ping/").then(e=>e.json()).then(async e=>{})}g.captureVisitorSession()},"complete"===document.readyState||"interactive"===document.readyState?(g.load(),console.log("loaded via document.readyState")):document.addEventListener("DOMContentLoaded",(function(){g.load(),console.log("loaded via DOMContentLoaded")})),"undefined"!=typeof window&&(window.TonicPow=g)}]);