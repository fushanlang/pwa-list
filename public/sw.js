if(!self.define){let e,c={};const a=(a,i)=>(a=new URL(a+".js",i).href,c[a]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=c,document.head.appendChild(e)}else e=a,importScripts(a),c()})).then((()=>{let e=c[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(c[s])return;let o={};const r=e=>a(e,s),d={module:{uri:s},exports:o,require:r};c[s]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(n(...e),o)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/9PDqDU21ZtjVMbU36KaZc/_buildManifest.js",revision:"59532caef25575151ade0a8acbd7c16f"},{url:"/_next/static/9PDqDU21ZtjVMbU36KaZc/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/9PDqDU21ZtjVMbU36KaZc/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/253-bcfad6d72d738d57.js",revision:"bcfad6d72d738d57"},{url:"/_next/static/chunks/626-81f0209553e638dd.js",revision:"81f0209553e638dd"},{url:"/_next/static/chunks/764-d2a0985ae1c20bd2.js",revision:"d2a0985ae1c20bd2"},{url:"/_next/static/chunks/821-01d8d6cdca8e25f8.js",revision:"01d8d6cdca8e25f8"},{url:"/_next/static/chunks/964-4c5d3ad81e835454.js",revision:"4c5d3ad81e835454"},{url:"/_next/static/chunks/cb1608f2-70794ada432b52e1.js",revision:"70794ada432b52e1"},{url:"/_next/static/chunks/framework-fc97f3f1282ce3ed.js",revision:"fc97f3f1282ce3ed"},{url:"/_next/static/chunks/main-93a45d5e0138d2c3.js",revision:"93a45d5e0138d2c3"},{url:"/_next/static/chunks/pages/_app-5b2c4ed44dfffac0.js",revision:"5b2c4ed44dfffac0"},{url:"/_next/static/chunks/pages/_error-1995526792b513b2.js",revision:"1995526792b513b2"},{url:"/_next/static/chunks/pages/about-b212d84a43c1a45c.js",revision:"b212d84a43c1a45c"},{url:"/_next/static/chunks/pages/app/%5Bname%5D-c0c81daff123e0ed.js",revision:"c0c81daff123e0ed"},{url:"/_next/static/chunks/pages/categories-ef3b04ca9486feb3.js",revision:"ef3b04ca9486feb3"},{url:"/_next/static/chunks/pages/categories/%5Bcategory%5D-0bb6cf2fcca2e3a5.js",revision:"0bb6cf2fcca2e3a5"},{url:"/_next/static/chunks/pages/index-fefa6b10c928100e.js",revision:"fefa6b10c928100e"},{url:"/_next/static/chunks/pages/search-b25ee322bb41fcc1.js",revision:"b25ee322bb41fcc1"},{url:"/_next/static/chunks/pages/sign-up-5825467f0838f578.js",revision:"5825467f0838f578"},{url:"/_next/static/chunks/pages/sign-up/loading-f1d547242758934a.js",revision:"f1d547242758934a"},{url:"/_next/static/chunks/pages/sitemap.xml-aab6064fd80e0766.js",revision:"aab6064fd80e0766"},{url:"/_next/static/chunks/pages/submissions-4b191c68eb3721a8.js",revision:"4b191c68eb3721a8"},{url:"/_next/static/chunks/pages/submissions/create-e018b949ebfd0e12.js",revision:"e018b949ebfd0e12"},{url:"/_next/static/chunks/pages/submissions/edit/%5Bname%5D-afb98d0fbf6ced31.js",revision:"afb98d0fbf6ced31"},{url:"/_next/static/chunks/pages/terms-privacy-3cf70da313928c42.js",revision:"3cf70da313928c42"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-9b312e20a4e32339.js",revision:"9b312e20a4e32339"},{url:"/_next/static/css/0072193d48c91aac.css",revision:"0072193d48c91aac"},{url:"/_next/static/css/a2a6f2995f770502.css",revision:"a2a6f2995f770502"},{url:"/about/mobile1.jpg",revision:"c1d10f3247aff2552b0dcec2ce34f736"},{url:"/about/mobile2.jpg",revision:"62127a6de1ba963b0bb81a850d3b6c5f"},{url:"/about/mobile3.jpg",revision:"2c785ebe877870836ae520caf2a2786f"},{url:"/about/pc1.png",revision:"250c45a7bf80a89231c86dbfddc527db"},{url:"/add-complete.svg",revision:"2bce4b267565be1c0d11c94ebaaaac60"},{url:"/ads.txt",revision:"3fade4b459b3f066e1c87ebeeb1c5879"},{url:"/default-app-icon.png",revision:"65c1bd1f00cc4514f4ae6f0ef9ed2362"},{url:"/favicon.ico",revision:"2e5abd636785dd0e9827845b5dd38274"},{url:"/favicon.png",revision:"d4e121597a6ae90ec62485475e5b3f6d"},{url:"/favicons/android-chrome-128x128.png",revision:"c1f7153721d11f0753fb705d391748cf"},{url:"/favicons/android-chrome-144x144.png",revision:"8ddd503a368b538d1e9252e690be0a52"},{url:"/favicons/android-chrome-152x152.png",revision:"240b5ba481924a123e9ee46e90985c10"},{url:"/favicons/android-chrome-192x192.png",revision:"963a20a215e6de899316c0acc52c9f32"},{url:"/favicons/android-chrome-256x256.png",revision:"1ca3260b34b23850c8f781437b81bdbe"},{url:"/favicons/android-chrome-36x36.png",revision:"0c3e89c6e6b82c4672227da08ad480b4"},{url:"/favicons/android-chrome-384x384.png",revision:"dc53120a1213df9b4ca27f50e2005ea3"},{url:"/favicons/android-chrome-48x48.png",revision:"5507a53664a887e10ec01ddc7b5318e2"},{url:"/favicons/android-chrome-512x512.png",revision:"f4367b65e0ebd921dba479e64c215dc4"},{url:"/favicons/android-chrome-72x72.png",revision:"e57f7ab6a6eb202c3cc8b1e5683df522"},{url:"/favicons/android-chrome-96x96.png",revision:"5e5d1facc90aa05f798ee9a7645c6f85"},{url:"/favicons/apple-touch-icon-114x114-precomposed.png",revision:"9f7a190b17ed814273294ae9d814dc37"},{url:"/favicons/apple-touch-icon-114x114.png",revision:"9f7a190b17ed814273294ae9d814dc37"},{url:"/favicons/apple-touch-icon-120x120-precomposed.png",revision:"aa5b95a4954ccaa2c4c34ef3f43c9443"},{url:"/favicons/apple-touch-icon-120x120.png",revision:"aa5b95a4954ccaa2c4c34ef3f43c9443"},{url:"/favicons/apple-touch-icon-144x144-precomposed.png",revision:"8ddd503a368b538d1e9252e690be0a52"},{url:"/favicons/apple-touch-icon-144x144.png",revision:"8ddd503a368b538d1e9252e690be0a52"},{url:"/favicons/apple-touch-icon-152x152-precomposed.png",revision:"240b5ba481924a123e9ee46e90985c10"},{url:"/favicons/apple-touch-icon-152x152.png",revision:"240b5ba481924a123e9ee46e90985c10"},{url:"/favicons/apple-touch-icon-180x180-precomposed.png",revision:"f9bdbef86ed3430025ae9ca1ef43e04a"},{url:"/favicons/apple-touch-icon-180x180.png",revision:"f9bdbef86ed3430025ae9ca1ef43e04a"},{url:"/favicons/apple-touch-icon-57x57-precomposed.png",revision:"9552478c67a08e29439006d73bbb1500"},{url:"/favicons/apple-touch-icon-57x57.png",revision:"9552478c67a08e29439006d73bbb1500"},{url:"/favicons/apple-touch-icon-60x60-precomposed.png",revision:"17e8a9362e9e1fdd645e2f3ab97e00fb"},{url:"/favicons/apple-touch-icon-60x60.png",revision:"17e8a9362e9e1fdd645e2f3ab97e00fb"},{url:"/favicons/apple-touch-icon-72x72-precomposed.png",revision:"e57f7ab6a6eb202c3cc8b1e5683df522"},{url:"/favicons/apple-touch-icon-72x72.png",revision:"e57f7ab6a6eb202c3cc8b1e5683df522"},{url:"/favicons/apple-touch-icon-76x76-precomposed.png",revision:"02007e2c9e220d9d74be2a0b0bf9ea73"},{url:"/favicons/apple-touch-icon-76x76.png",revision:"02007e2c9e220d9d74be2a0b0bf9ea73"},{url:"/favicons/apple-touch-icon-precomposed.png",revision:"f9bdbef86ed3430025ae9ca1ef43e04a"},{url:"/favicons/apple-touch-icon.png",revision:"f9bdbef86ed3430025ae9ca1ef43e04a"},{url:"/favicons/favicon.ico",revision:"bae2c9320084c45d32ca3cc681111846"},{url:"/favicons/icon-128x128.png",revision:"c1f7153721d11f0753fb705d391748cf"},{url:"/favicons/icon-144x144.png",revision:"8ddd503a368b538d1e9252e690be0a52"},{url:"/favicons/icon-152x152.png",revision:"240b5ba481924a123e9ee46e90985c10"},{url:"/favicons/icon-160x160.png",revision:"d8cd24e807cf759f4c98cd735df08880"},{url:"/favicons/icon-16x16.png",revision:"61f6504ff8b72db6078568d67719cf07"},{url:"/favicons/icon-192x192.png",revision:"963a20a215e6de899316c0acc52c9f32"},{url:"/favicons/icon-196x196.png",revision:"ab2107edc960f50c0b1323a28c4eba52"},{url:"/favicons/icon-24x24.png",revision:"4b8f21d732b62d289203abc65718b01c"},{url:"/favicons/icon-256x256.png",revision:"1ca3260b34b23850c8f781437b81bdbe"},{url:"/favicons/icon-32x32.png",revision:"b26d5b6226bca0d1ec49b676669f1ecf"},{url:"/favicons/icon-36x36.png",revision:"0c3e89c6e6b82c4672227da08ad480b4"},{url:"/favicons/icon-384x384.png",revision:"dc53120a1213df9b4ca27f50e2005ea3"},{url:"/favicons/icon-48x48.png",revision:"5507a53664a887e10ec01ddc7b5318e2"},{url:"/favicons/icon-512x512.png",revision:"f4367b65e0ebd921dba479e64c215dc4"},{url:"/favicons/icon-72x72.png",revision:"e57f7ab6a6eb202c3cc8b1e5683df522"},{url:"/favicons/icon-96x96.png",revision:"5e5d1facc90aa05f798ee9a7645c6f85"},{url:"/favicons/site-tile-150x150.png",revision:"523750c1e8971915293b002cf4b3ee5d"},{url:"/favicons/site-tile-310x150.png",revision:"a1a5378b13ad76e0f7d0f8b2df51cec4"},{url:"/favicons/site-tile-310x310.png",revision:"cb6fd52ea4ab9fd1cb7425f4ad5eb3d5"},{url:"/favicons/site-tile-70x70.png",revision:"83f5db8d85ebb1343364532951f1592a"},{url:"/icon.png",revision:"a9bf840307b701966c4d41ba165f4111"},{url:"/logo/FaceBook.png",revision:"1a38413737f468994d8c3313b2e73423"},{url:"/logo/Google.png",revision:"ecc844337bfe607020e2aa4aa3562e29"},{url:"/logo/Twitter.png",revision:"89b19179d68e97ff8f59190505cbd05e"},{url:"/manifest.json",revision:"64019be0ee006968dd1de6d9963823cb"},{url:"/not-found.svg",revision:"0a1c33333c4abc93370cf311cc4c3f11"},{url:"/robots.txt",revision:"792cfc5fc6f91730ca907b10d258d154"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:c,event:a,state:i})=>c&&"opaqueredirect"===c.type?new Response(c.body,{status:200,statusText:"OK",headers:c.headers}):c}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const c=e.pathname;return!c.startsWith("/api/auth/")&&!!c.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
