!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r=class{constructor(t){for(let e in t)this[e]=t[e]}static get schema(){return{B:{},MAP:{},in:[]}}get bImgDataSrc(){if(this.B&&"binary"===this.B.encoding)return"data:"+this.B["content-type"]+";base64, "+this.B.content}get adType(){return this.MAP&&this.MAP.ad_type&&"funding"===this.MAP.ad_type?"funding":"display"}get ctaUrl(){if(this.MAP&&this.MAP.cta_url)return this.MAP.cta_url}get ctaText(){return this.MAP&&this.MAP.cta_text?this.MAP.cta_text:"Donate"}get affiliateAddress(){if(this.MAP&&this.MAP.affiliate_address&&"00"!==this.MAP.affiliate_address)return this.MAP.affiliate_address}get currency(){return this.MAP&&this.MAP.currency?this.MAP.currency:"usd"}get firstVinAddress(){if(this.in&&this.in[0]&&this.in[0].e.a)return this.in[0].e.a}};const o={TransformTxs:t=>{if(!t)throw new Error("Cant process tx",t);let e={"19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut":"B","1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5":"MAP","15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva":"AUTHOR_IDENTITY"},n={B:[{content:"string"},{"content-type":"string"},{encoding:"string"},{filename:"string"}],MAP:[{cmd:"string"},[{key:"string"},{val:"string"}]],AUTHOR_IDENTITY:[{algo:"string"},{pubkey:"string"},{sig:"string"}]},r={},o=e[t.out.filter(t=>t&&106===t.b0.op)[0].s1],a=0;for(let s of Object.keys(t)){if("out"===s&&t[s].some(t=>t&&t.b0&&106===t.b0.op)){let i=t[s][0],c=0;for(let t in i){(t=i.hasOwnProperty(t)?t:i.hasOwnProperty("l"+t)?"l"+t:null)||(t="lb"+a,t="ls"+a);let s,l=i[t];if(!t.startsWith("s")&&!t.startsWith("ls")||"str"===t)continue;if(l.hasOwnProperty("op"))continue;if(Object.keys(e).some(t=>t===l)&&0===a){o=e[l];continue}if(a||(r[o]=[]),"|"===l){a=0;continue}let d=n[o][a],u={};if(d instanceof Array){c%=d.length,u[Object.keys(d[c++])[0]]=l,r[o].push(u)}else d&&(u[s=Object.keys(d)[0]]=l),r[o].push(u),a++}}r[s]=t[s]}let s,i={},c={},l=r;if(l.hasOwnProperty("MAP")){for(let t of l.MAP){let e=Object.keys(t)[0];"key"===e?s=Object.values(t)[0]:"val"===e&&(i[s]=Object.values(t)[0])}l.MAP=i}if(l.hasOwnProperty("B")){for(let t of l.B){c[Object.keys(t)[0]]=Object.values(t)[0]}c.hasOwnProperty("encoding")&&"binary"===c.encoding&&l.out.some(t=>t.s1===(void 0).B_PREFIX&&"binary"===t.s4)&&(c.content=l.out.filter(t=>t&&t.s1===(void 0).B_PREFIX).map(t=>t.lb2)[0]),l.B=c}return l}};var a=o;const s={},i={v:3,q:{find:{"out.s7":"1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5","out.s9":"app","out.s10":"tonicpow"}},limit:10},c=btoa(JSON.stringify(i));s.socket=null,s.callback=null,s.connect=(t=>{s.callback=t,console.log("connect with callback",s.callback),s.socket=new EventSource("https://genesis.bitdb.network/s/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/"+c),s.socket.onmessage=(t=>{let e=JSON.parse(t.data||{}).data||[],n=JSON.parse(t.data||{}).type||"";if(console.log("message type",n),e)switch(n){case"open":s.callback(n,e);break;case"u":if(!e.length)return;console.log("data",e),s.callback(n,e);break;case"block":conole.log("NEW BLOCK. Update ad if current schedule expired.",e);for(let t of tonicIframes)t.contentWindow.postMessage({block:JSON.stringify(e)},"https://app.tonicpow.com")}}),s.socket.onerror=(t=>s.callback("error",t))});var l=s;const d={lookup:t=>{let e="";if(!t||!t.includes("$"))return console.error("invalid handcash handle: "+t),"";if(null!==(e=localStorage.getItem(t))&&e.length>=34&&e.startsWith("1"))return console.log("handcash found locally, skipping lookup! "+t+":"+e),e;try{console.log("fetching handcash handle: "+t);let n=new XMLHttpRequest;n.open("GET","https://api.handcash.io/api/receivingAddress/"+t.substr(1),!1),n.onload=function(){if(!(n.status>=200&&n.status<400))return 405===n.status?(console.log("method not allowed from handcash"),""):(console.error(n),"");{let r=JSON.parse(n.responseText);if(r.hasOwnProperty("receivingAddress"))return e=r.receivingAddress,localStorage.setItem(t,e),e}},n.onerror=function(){return console.error(n),""},n.send()}catch(t){return console.error("issue getting handcash handle",t),""}}};var u=d;let f={};f.Handcash=u,f.bmap=a,f.BitSocket=l,f.Iframes=new Map,"complete"===document.readyState||"interactive"===document.readyState?f.iframeLoader():document.addEventListener("DOMContentLoaded",function(){f.iframeLoader(),l.connect((t,e)=>{if("error"===t)return void console.error(e);if("open"===t)return;let n=f.processTonics(e);if(n.length>0&&n[0].hasOwnProperty("tx")){let t=n[0];if(f.Iframes.get(t.MAP.ad_unit_id)===t.MAP.site_address){let e=document.getElementById("tonic_"+t.MAP.ad_unit_id);if(e){let r=new URLSearchParams(e.src).get("address");r&&r.length>25&&r===t.MAP.address&&e.contentWindow.postMessage({tonics:JSON.stringify(n)},"https://app.tonicpow.com")}}}})}),f.processTonics=(t=>{let e=[];for(let n of t){let t=new r(a.TransformTxs(n));e.push(t)}return e}),f.iframeLoader=(async()=>{const t=["bsv","usd"];let e=document.head.querySelector("[name=bitcoin-address][content]")?document.head.querySelector("[name=bitcoin-address][content]").content:"",n=document.head.querySelector("[name=bitcoin-tx][content]")?document.head.querySelector("[name=bitcoin-tx][content]").content:"",r=new URLSearchParams(window.location.search).get("affiliate");r&&(void 0===(r=r.includes("$")?await u.lookup(r):r)||!r||""===r||r.length<=25)&&(r="");let o=document.getElementsByClassName("tonic");if(o&&0!==o.length){for(let a=o.length-1;a>=0;a--){let s=o[a],i=s.getAttribute("data-width");i&&""!==i||(i=300);let c=s.getAttribute("data-height");c&&""!==c||(c=250);let l=s.getAttribute("data-unit-id");l&&""!==l||(console.log("data-unit-id not found, using default: embed-1"),l="embed-1");let d=s.getAttribute("data-address");(void 0===d||!d||d.length<=25)&&(e?(d=e,console.log("data-address not found or invalid: "+d+" using sticker address: "+e)):(d="1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD",console.log("data-address not found or invalid: "+d+" using default address: 1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD")));let h=s.getAttribute("data-handcash"),g="";h&&d.includes("$")&&(void 0===(g=await u.lookup(h))||!g||""===g||g.length<=25?g="":d=g);let p=localStorage.getItem("affiliate_"+d);p?(r=p,console.log("affiliate found in local storage: "+r)):r&&(localStorage.setItem("affiliate_"+d,r),console.log("saving affiliate in local storage: "+r));let b=s.getAttribute("data-rate");b&&""!==b||(b=546);let m=s.getAttribute("data-image");m&&""!==m||(m="");let y=s.getAttribute("data-link-color");y&&""!==y?6!==(y=y.replace(/[^a-zA-Z]+/g,"")).length&&3!==y.length&&(y=""):y="";let A=s.getAttribute("data-currency");A&&""!==A?-1===t.indexOf(A)&&(A="bsv",b=546):A="bsv",A=A.toLowerCase();let P=document.createElement("iframe");P.src="https://app.tonicpow.com/?unit_id="+l+"&address="+d+(r?"&affiliate="+r:"")+(e?"&sticker_address="+e:"")+(n?"&sticker_tx="+n:"")+"&rate="+b+"&currency="+A+"&width="+i+"&height="+c+(m?"&image="+m:"")+(y?"&link_color="+y:"")+"&cache="+Math.random(),P.width=i,P.height=parseInt(c)+28,P.id="tonic_"+l,P.setAttribute("scrolling","no"),P.setAttribute("data-unit-id",l),P.setAttribute("data-address",d),r&&P.setAttribute("data-affiliate",r),P.setAttribute("data-sticker-address",e),P.setAttribute("data-sticker-tx",n),P.setAttribute("data-handcash",h),P.setAttribute("data-link-color",y),P.importance="high",P.frameBorder="0",P.style.border="none",P.style.overflow="hidden",P.style.backgroundColor="transparent",P.allowTransparency="true",f.Iframes.set(l,d),s.parentNode.replaceChild(P,s)}console.log("Tonic Map:",f.Iframes)}else console.info("no tonic divs found with class 'tonic'")}),window.TonicPow=f}]);