if(!self.define){let o,i={};const e=(e,f)=>(e=new URL(e+".js",f).href,i[e]||new Promise((i=>{if("document"in self){const o=document.createElement("script");o.src=e,o.onload=i,document.head.appendChild(o)}else o=e,importScripts(e),i()})).then((()=>{let o=i[e];if(!o)throw new Error(`Module ${e} didn’t register its module`);return o})));self.define=(f,n)=>{const r=o||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let t={};const s=o=>e(o,r),a={module:{uri:r},exports:t,require:s};i[r]=Promise.all(f.map((o=>a[o]||s(o)))).then((o=>(n(...o),t)))}}define(["./workbox-52b387b9"],(function(o){"use strict";self.addEventListener("message",(o=>{o.data&&"SKIP_WAITING"===o.data.type&&self.skipWaiting()})),o.precacheAndRoute([{url:"142.a46e7374.js",revision:null},{url:"142.a46e7374.js.LICENSE.txt",revision:"6293c204f4d048d5b238a05e47b362f6"},{url:"466.c1cceaaf.js",revision:null},{url:"9.2b145863.js",revision:null},{url:"demo.cb430e95.js",revision:null},{url:"display.90a03517.js",revision:null},{url:"editing.e1b76994.js",revision:null},{url:"editing.e1b76994.js.LICENSE.txt",revision:"0646c38bb7edb24e8a52b92493ca5ee3"},{url:"fonts/roboto-latin-100.woff",revision:"5cb7edfceb233100075dc9a1e12e8da3"},{url:"fonts/roboto-latin-100.woff2",revision:"7370c3679472e9560965ff48a4399d0b"},{url:"fonts/roboto-latin-100italic.woff",revision:"f9e8e590b4e0f1ff83469bb2a55b8488"},{url:"fonts/roboto-latin-100italic.woff2",revision:"f8b1df51ba843179fa1cc9b53d58127a"},{url:"fonts/roboto-latin-300.woff",revision:"b00849e00f4c2331cddd8ffb44a6720b"},{url:"fonts/roboto-latin-300.woff2",revision:"ef7c6637c68f269a882e73bcb57a7f6a"},{url:"fonts/roboto-latin-300italic.woff",revision:"4df32891a5f2f98a363314f595482e08"},{url:"fonts/roboto-latin-300italic.woff2",revision:"14286f3ba79c6627433572dfa925202e"},{url:"fonts/roboto-latin-400.woff",revision:"60fa3c0614b8fb2f394fa29944c21540"},{url:"fonts/roboto-latin-400.woff2",revision:"479970ffb74f2117317f9d24d9e317fe"},{url:"fonts/roboto-latin-400italic.woff",revision:"fe65b8335ee19dd944289f9ed3178c78"},{url:"fonts/roboto-latin-400italic.woff2",revision:"51521a2a8da71e50d871ac6fd2187e87"},{url:"fonts/roboto-latin-500.woff",revision:"87284894879f5b1c229cb49c8ff6decc"},{url:"fonts/roboto-latin-500.woff2",revision:"020c97dc8e0463259c2f9df929bb0c69"},{url:"fonts/roboto-latin-500italic.woff",revision:"288ad9c6e8b43cf02443a1f499bdf67e"},{url:"fonts/roboto-latin-500italic.woff2",revision:"db4a2a231f52e497c0191e8966b0ee58"},{url:"fonts/roboto-latin-700.woff",revision:"adcde98f1d584de52060ad7b16373da3"},{url:"fonts/roboto-latin-700.woff2",revision:"2735a3a69b509faf3577afd25bdf552e"},{url:"fonts/roboto-latin-700italic.woff",revision:"81f57861ed4ac74741f5671e1dff2fd9"},{url:"fonts/roboto-latin-700italic.woff2",revision:"da0e717829e033a69dec97f1e155ae42"},{url:"fonts/roboto-latin-900.woff",revision:"bb1e4dc6333675d11ada2e857e7f95d7"},{url:"fonts/roboto-latin-900.woff2",revision:"9b3766ef4a402ad3fdeef7501a456512"},{url:"fonts/roboto-latin-900italic.woff",revision:"28f9151055c950874d2c6803a39b425b"},{url:"fonts/roboto-latin-900italic.woff2",revision:"ebf6d1640ccddb99fb49f73c052c55a8"},{url:"index.html",revision:"aa90ba46ffa21f249b22691bb9cf8ad5"},{url:"main.b23b60bb.js",revision:null},{url:"main.b23b60bb.js.LICENSE.txt",revision:"ddaef1761da9718367006e6a051e587c"},{url:"main.css",revision:"91cd2ca1150789d3db1dbe03d6ff6608"},{url:"map-backend-svg.fc844100.js",revision:null},{url:"map-backend-webgl.37871b89.js",revision:null},{url:"not-found.1d330486.js",revision:null},{url:"static/icons/favicon.png",revision:"ef8852a8e00621ec773033b6285ac96e"},{url:"static/icons/icon-128x128.png",revision:"3e88d51f7f961827c0077a72930e3948"},{url:"static/icons/icon-144x144.png",revision:"54674361992cbf841cb9f8814ed14b25"},{url:"static/icons/icon-152x152.png",revision:"f2129e4d1fbd951846895bbdd7a7fb31"},{url:"static/icons/icon-192x192.png",revision:"a42d32a02041329dff8b1a2077fd43a0"},{url:"static/icons/icon-384x384.png",revision:"220fc77b00911d2c32acedc4f31e0095"},{url:"static/icons/icon-512x512.png",revision:"18272e7de1bffdf3f74c8c411655b1da"},{url:"static/icons/icon-72x72.png",revision:"8301959131c990fffa2aeda000f8688e"},{url:"static/icons/icon-96x96.png",revision:"9e82323862cd8b2763e3b941ed8322b7"},{url:"vendor/custom-elements-es5-adapter.js",revision:"3b6ff4c01a2d559446c2282d6dc9bbc0"},{url:"vendor/custom-elements-es5-adapter.js.LICENSE.txt",revision:"edfbec94c3d85957a30b133592929851"},{url:"vendor/webcomponents-loader.js",revision:"c7d9f55830713ddc982a9a67c539f51f"},{url:"vendor/webcomponents-loader.js.LICENSE.txt",revision:"3775172c83d28a0748bf5e682071bbc9"}],{}),o.cleanupOutdatedCaches(),o.registerRoute(/vendor.*bundle/,new o.CacheFirst,"GET"),o.registerRoute(/\.bin$/,new o.CacheFirst,"GET"),o.registerRoute(/\.json$/,new o.NetworkFirst,"GET")}));
//# sourceMappingURL=service-worker.js.map
