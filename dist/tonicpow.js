!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var o=class{constructor(t){for(let e in t)this[e]=t[e]}get schema(){return{B:{},MAP:{},in:[]}}get bImgDataSrc(){if(this.B&&"binary"===this.B.encoding)return"data:"+this.B["content-type"]+";base64, "+this.B.content}get adType(){return this.MAP&&this.MAP.ad_type&&"funding"===this.MAP.ad_type?"funding":"display"}get ctaUrl(){if(this.MAP&&this.MAP.cta_url)return this.MAP.cta_url}get ctaText(){return this.MAP&&this.MAP.cta_text?this.MAP.cta_text:"Donate"}get affiliatePubKey(){if(this.MAP&&this.MAP.affiliate_pub_key&&"00"!==this.MAP.affiliate_pub_key)return this.MAP.affiliate_pub_key}get currency(){return this.MAP&&this.MAP.currency?this.MAP.currency:"usd"}get firstVinAddress(){if(this.in&&this.in[0]&&this.in[0].e.a)return this.in[0].e.a}};const r={TransformTxs:t=>{if(!t)throw new Error("Cant process tx",t);let e={"19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut":"B","1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5":"MAP","15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva":"AUTHOR_IDENTITY"},n={B:[{content:"string"},{"content-type":"string"},{encoding:"string"},{filename:"string"}],MAP:[{cmd:"string"},[{key:"string"},{val:"string"}]],AUTHOR_IDENTITY:[{algo:"string"},{pubkey:"string"},{sig:"string"}]},o={},r=e[t.out.filter(t=>t&&106===t.b0.op)[0].s1],a=0;for(let i of Object.keys(t)){if("out"===i&&t[i].some(t=>t&&t.b0&&106===t.b0.op)){let s=t[i][0],c=0;for(let t in s){(t=s.hasOwnProperty(t)?t:s.hasOwnProperty("l"+t)?"l"+t:null)||(t="lb"+a,t="ls"+a);let i,l=s[t];if(!t.startsWith("s")&&!t.startsWith("ls")||"str"===t)continue;if(l.hasOwnProperty("op"))continue;if(Object.keys(e).some(t=>t===l)&&0===a){r=e[l];continue}if(a||(o[r]=[]),"|"===l){a=0;continue}let u=n[r][a],d={};if(u instanceof Array){c%=u.length,d[Object.keys(u[c++])[0]]=l,o[r].push(d)}else u&&(d[i=Object.keys(u)[0]]=l),o[r].push(d),a++}}o[i]=t[i]}let i,s={},c={},l=o;if(l.hasOwnProperty("MAP")){for(let t of l.MAP){let e=Object.keys(t)[0];"key"===e?i=Object.values(t)[0]:"val"===e&&(s[i]=Object.values(t)[0])}l.MAP=s}if(l.hasOwnProperty("B")){for(let t of l.B){c[Object.keys(t)[0]]=Object.values(t)[0]}c.hasOwnProperty("encoding")&&"binary"===c.encoding&&l.out.some(t=>t.s1===(void 0).B_PREFIX&&"binary"===t.s4)&&(c.content=l.out.filter(t=>t&&t.s1===(void 0).B_PREFIX).map(t=>t.lb2)[0]),l.B=c}return l}};var a=r;const i={},s={v:3,q:{find:{"out.s7":"1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5","out.s9":"app","out.s10":"tonicpow"}},limit:10},c=btoa(JSON.stringify(s));i.socket=null,i.callback=null,i.connect=(t=>{i.callback=t,console.log("connect with callback",i.callback),i.socket=new EventSource("https://genesis.bitdb.network/s/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/"+c),i.socket.onmessage=(t=>{let e=JSON.parse(t.data||{}).data||[],n=JSON.parse(t.data||{}).type||"";if(console.log("message type",n),e)switch(n){case"open":i.callback(n,e);break;case"u":if(!e.length)return;console.log("data",e),i.callback(n,e);break;case"block":conole.log("NEW BLOCK. Update ad if current schedule expired.",e);for(let t of tonicIframes)t.contentWindow.postMessage({block:JSON.stringify(e)},"https://app.tonicpow.com")}}),i.socket.onerror=(t=>i.callback("error",t))});var l=i;const u={lookup:t=>{let e="";if(!t||!t.includes("$"))return console.error("invalid handcash handle: "+t),"";if(null!==(e=localStorage.getItem(t))&&e.length>=34&&e.startsWith("1"))return console.log("handcash found locally, skipping lookup! "+t+":"+e),e;try{console.log("fetching handcash handle: "+t);let n=new XMLHttpRequest;n.open("GET","https://api.handcash.io/api/receivingAddress/"+t.substr(1),!1),n.onload=function(){if(!(n.status>=200&&n.status<400))return 405===n.status?(console.log("method not allowed from handcash"),""):(console.error(n),"");{let o=JSON.parse(n.responseText);if(o.hasOwnProperty("receivingAddress"))return e=o.receivingAddress,localStorage.setItem(t,e),e}},n.onerror=function(){return console.error(n),""},n.send()}catch(t){return console.error("issue getting handcash handle",t),""}}};var d=u;let f={};f.Handcash=d,f.bmap=a,f.BitSocket=l,f.Iframes=new Map,"complete"===document.readyState||"interactive"===document.readyState?f.iframeLoader():document.addEventListener("DOMContentLoaded",function(){f.iframeLoader(),l.connect((t,e)=>{if("error"===t)return void console.error(e);if("open"===t)return;let n=f.processTonics(e);if(n.length>0&&n[0].hasOwnProperty("tx")){let t=n[0];if(f.Iframes.get(t.MAP.ad_unit_id)===t.MAP.site_pub_key){let e=document.getElementById("tonic_"+t.MAP.ad_unit_id);e&&e.contentWindow.postMessage({tonics:JSON.stringify(n)},"https://app.tonicpow.com")}}})}),f.processTonics=(t=>{let e=[];for(let n of t){let t=new o(a.TransformTxs(n));e.push(t)}return e}),f.iframeLoader=(async()=>{const t=["bsv","usd"];let e=document.head.querySelector("[name=bitcoin-address][content]")?document.head.querySelector("[name=bitcoin-address][content]").content:"",n=document.head.querySelector("[name=bitcoin-tx][content]")?document.head.querySelector("[name=bitcoin-tx][content]").content:"",o=new URLSearchParams(window.location.search).get("affiliate");o&&(void 0===(o=null!==o&&o.includes("$")?await d.lookup(o):o)||!o||""===o||o.length<=25)&&(o="");let r=document.getElementsByClassName("tonic");if(r&&0!==r.length){for(let a=r.length-1;a>=0;a--){let i=r[a],s=i.getAttribute("data-width");s&&""!==s||(s=300);let c=i.getAttribute("data-height");c&&""!==c||(c=250);let l=i.getAttribute("data-unit-id");l&&""!==l||(console.log("data-unit-id not found, using default: embed-1"),l="embed-1");let u=i.getAttribute("data-pubkey");(void 0===(u=await(u&&u.includes("$"))?d.lookup(u):u)||!u||u.length<34)&&(e?(u=e,console.log("data-pubkey not found or invalid: "+u+" using sticker address: "+e)):(u="1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD",console.log("data-pubkey not found or invalid: "+u+" using default address: 1LWyDs4qzmfAhGpSZk1K1kLmNdafBDdJSD")));let h=localStorage.getItem("affiliate_"+u);h?o=h:o&&localStorage.setItem("affiliate_"+u,o);let p=i.getAttribute("data-state");p&&""!==p||(p="");let g=i.getAttribute("data-rate");g&&""!==g||(g=546);let b=i.getAttribute("data-image");b&&""!==b||(b="");let y=i.getAttribute("data-bg-color");y&&""!==y||(y="");let m=i.getAttribute("data-link-color");m&&""!==m||(m="");let k=i.getAttribute("data-currency");k&&""!==k?-1===t.indexOf(k)&&(k="bsv",g=546):k="bsv",k=k.toLowerCase();let A=document.createElement("iframe");A.src="https://app.tonicpow.com/"+p+"?unit_id="+l+"&pubkey="+u+(o?"&affiliate="+o:"")+"&sticker_address="+e+"&sticker_tx="+n+"&rate="+g+"&currency="+k+"&width="+s+"&height="+c+"&image="+b+"&background_color="+y+"&link_color="+m+"cache="+Math.random(),A.width=s,A.height=parseInt(c)+28,A.id="tonic_"+l,A.setAttribute("data-unit-id",l),A.setAttribute("data-pubkey",u),o&&A.setAttribute("data-affiliate",o),A.setAttribute("data-sticker-address",e),A.importance="high",A.frameBorder="0",A.style.border="none",A.style.overflow="hidden",f.Iframes.set(l,u),i.parentNode.replaceChild(A,i)}console.log("Tonic Map:",f.Iframes)}else console.info("no tonic divs found with class 'tonic'")}),window.TonicPow=f}]);