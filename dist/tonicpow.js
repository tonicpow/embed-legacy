!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var o=class{constructor(t){for(let e in t)this[e]=t[e]}static get schema(){return{B:{},MAP:{},in:[]}}get bImgDataSrc(){if(this.B&&"binary"===this.B.encoding)return"data:"+this.B["content-type"]+";base64, "+this.B.content}get adType(){return this.MAP&&this.MAP.ad_type&&"funding"===this.MAP.ad_type?"funding":"display"}get ctaUrl(){if(this.MAP&&this.MAP.cta_url)return this.MAP.cta_url}get ctaText(){return this.MAP&&this.MAP.cta_text?this.MAP.cta_text:"Donate"}get affiliatePubKey(){if(this.MAP&&this.MAP.affiliate_pub_key&&"00"!==this.MAP.affiliate_pub_key)return this.MAP.affiliate_pub_key}get currency(){return this.MAP&&this.MAP.currency?this.MAP.currency:"usd"}get firstVinAddress(){if(this.in&&this.in[0]&&this.in[0].e.a)return this.in[0].e.a}};const r={TransformTxs:t=>{if(!t)throw new Error("Cant process tx",t);let e={"19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut":"B","1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5":"MAP","15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva":"AUTHOR_IDENTITY"},n={B:[{content:"string"},{"content-type":"string"},{encoding:"string"},{filename:"string"}],MAP:[{cmd:"string"},[{key:"string"},{val:"string"}]],AUTHOR_IDENTITY:[{algo:"string"},{pubkey:"string"},{sig:"string"}]},o={},r=e[t.out.filter(t=>t&&106===t.b0.op)[0].s1],a=0;for(let i of Object.keys(t)){if("out"===i&&t[i].some(t=>t&&t.b0&&106===t.b0.op)){let s=t[i][0],c=0;for(let t in s){(t=s.hasOwnProperty(t)?t:s.hasOwnProperty("l"+t)?"l"+t:null)||(t="lb"+a,t="ls"+a);let i,l=s[t];if(!t.startsWith("s")&&!t.startsWith("ls")||"str"===t)continue;if(l.hasOwnProperty("op"))continue;if(Object.keys(e).some(t=>t===l)&&0===a){r=e[l];continue}if(a||(o[r]=[]),"|"===l){a=0;continue}let d=n[r][a],u={};if(d instanceof Array){c%=d.length,u[Object.keys(d[c++])[0]]=l,o[r].push(u)}else d&&(u[i=Object.keys(d)[0]]=l),o[r].push(u),a++}}o[i]=t[i]}let i,s={},c={},l=o;if(l.hasOwnProperty("MAP")){for(let t of l.MAP){let e=Object.keys(t)[0];"key"===e?i=Object.values(t)[0]:"val"===e&&(s[i]=Object.values(t)[0])}l.MAP=s}if(l.hasOwnProperty("B")){for(let t of l.B){c[Object.keys(t)[0]]=Object.values(t)[0]}c.hasOwnProperty("encoding")&&"binary"===c.encoding&&l.out.some(t=>t.s1===(void 0).B_PREFIX&&"binary"===t.s4)&&(c.content=l.out.filter(t=>t&&t.s1===(void 0).B_PREFIX).map(t=>t.lb2)[0]),l.B=c}return l}};var a=r;const i={},s={v:3,q:{find:{"out.s7":"1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5","out.s9":"app","out.s10":"tonicpow"}},limit:10},c=btoa(JSON.stringify(s));i.socket=null,i.callback=null,i.connect=(t=>{i.callback=t,console.log("connect with callback",i.callback),i.socket=new EventSource("https://genesis.bitdb.network/s/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/"+c),i.socket.onmessage=(t=>{let e=JSON.parse(t.data||{}).data||[],n=JSON.parse(t.data||{}).type||"";if(console.log("message type",n),e)switch(n){case"open":i.callback(n,e);break;case"u":if(!e.length)return;console.log("data",e),i.callback(n,e);break;case"block":conole.log("NEW BLOCK. Update ad if current schedule expired.",e);for(let t of tonicIframes)t.contentWindow.postMessage({block:JSON.stringify(e)},"https://app.tonicpow.com")}}),i.socket.onerror=(t=>i.callback("error",t))});var l=i;const d={lookup:t=>{let e="";if(!t||!t.includes("$"))return console.error("invalid handcash handle: "+t),"";if(null!==(e=localStorage.getItem(t))&&e.length>=34&&e.startsWith("1"))return console.log("handcash found locally, skipping lookup! "+t+":"+e),e;try{console.log("fetching handcash handle: "+t);let n=new XMLHttpRequest;n.open("GET","https://api.handcash.io/api/receivingAddress/"+t.substr(1),!1),n.onload=function(){if(!(n.status>=200&&n.status<400))return 405===n.status?(console.log("method not allowed from handcash"),""):(console.error(n),"");{let o=JSON.parse(n.responseText);if(o.hasOwnProperty("receivingAddress"))return e=o.receivingAddress,localStorage.setItem(t,e),e}},n.onerror=function(){return console.error(n),""},n.send()}catch(t){return console.error("issue getting handcash handle",t),""}}};var u=d;let f={};f.Handcash=u,f.bmap=a,f.BitSocket=l,f.Iframes=new Map,"complete"===document.readyState||"interactive"===document.readyState?f.iframeLoader():document.addEventListener("DOMContentLoaded",function(){f.iframeLoader(),l.connect((t,e)=>{if("error"===t)return void console.error(e);if("open"===t)return;let n=f.processTonics(e);if(n.length>0&&n[0].hasOwnProperty("tx")){let t=n[0];if(f.Iframes.get(t.MAP.ad_unit_id)===t.MAP.site_pub_key){let e=document.getElementById("tonic_"+t.MAP.ad_unit_id);e&&e.contentWindow.postMessage({tonics:JSON.stringify(n)},"https://app.tonicpow.com")}}})}),f.processTonics=(t=>{let e=[];for(let n of t){let t=new o(a.TransformTxs(n));e.push(t)}return e}),f.iframeLoader=(async()=>{const t=["bsv","usd"];let e=document.head.querySelector("[name=bitcoin-address][content]")?document.head.querySelector("[name=bitcoin-address][content]").content:"",n=document.head.querySelector("[name=bitcoin-tx][content]")?document.head.querySelector("[name=bitcoin-tx][content]").content:"",o=new URLSearchParams(window.location.search).get("affiliate");o&&(void 0===(o=o.includes("$")?await u.lookup(o):o)||!o||""===o||o.length<=25)&&(o="");let r=document.getElementsByClassName("tonic");if(r&&0!==r.length){for(let a=r.length-1;a>=0;a--){let i=r[a],s=i.getAttribute("data-width");s&&""!==s||(s=300);let c=i.getAttribute("data-height");c&&""!==c||(c=250);let l=i.getAttribute("data-unit-id");l&&""!==l||(console.log("data-unit-id not found, using default: embed-1"),l="embed-1");let d=i.getAttribute("data-pubkey");(void 0===d||!d||d.length<34)&&(e?(d=e,console.log("data-pubkey not found or invalid: "+d+" using sticker address: "+e)):(d="1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD",console.log("data-pubkey not found or invalid: "+d+" using default address: 1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD")));let h=i.getAttribute("data-handcash"),g="";h&&d.includes("$")&&(void 0===(g=await u.lookup(h))||!g||""===g||g.length<=25?g="":d=g);let p=localStorage.getItem("affiliate_"+d);p?(o=p,console.log("affiliate found in local storage: "+o)):o&&(localStorage.setItem("affiliate_"+d,o),console.log("saving affiliate in local storage: "+o));let b=i.getAttribute("data-state");b&&""!==b||(b="");let y=i.getAttribute("data-rate");y&&""!==y||(y=546);let m=i.getAttribute("data-image");m&&""!==m||(m="");let k=i.getAttribute("data-bg-color");k&&""!==k||(k="");let A=i.getAttribute("data-link-color");A&&""!==A||(A="");let P=i.getAttribute("data-currency");P&&""!==P?-1===t.indexOf(P)&&(P="bsv",y=546):P="bsv",P=P.toLowerCase();let v=document.createElement("iframe");v.src="https://app.tonicpow.com/"+b+"?unit_id="+l+"&pubkey="+d+(o?"&affiliate="+o:"")+(e?"&sticker_address="+e:"")+(n?"&sticker_tx="+n:"")+"&rate="+y+"&currency="+P+"&width="+s+"&height="+c+(m?"&image="+m:"")+(k?"&background_color="+k:"")+(A?"&link_color="+A:"")+"&cache="+Math.random(),v.width=s,v.height=parseInt(c)+28,v.id="tonic_"+l,v.setAttribute("data-unit-id",l),v.setAttribute("data-pubkey",d),o&&v.setAttribute("data-affiliate",o),v.setAttribute("data-sticker-address",e),v.setAttribute("data-sticker-tx",n),v.setAttribute("data-handcash",h),v.importance="high",v.frameBorder="0",v.style.border="none",v.style.overflow="hidden",f.Iframes.set(l,d),i.parentNode.replaceChild(v,i)}console.log("Tonic Map:",f.Iframes)}else console.info("no tonic divs found with class 'tonic'")}),window.TonicPow=f}]);