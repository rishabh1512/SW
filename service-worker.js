/*Service Worker Events*/
const version = 1;
const staticName = `staticCache-${version}`;
const dynamicName = `dynamicache`;
const fontName = `fontCache`;
const imgName = `imagename`;

let assets = ['/','/index.html','/js/index.js','/css/index.css'];

self.addEventListener('install',(evt) =>{
    evt.waitUntil(
       caches.open(staticName).then((cache) =>{
            cache.addAll(assets).then(() =>{
                console.log(`${staticName} assests updated`);
            })
       })
    )
})

self.addEventListener('activate',(evt) =>{
    evt.waitUntil( 
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key != staticName).map(key => caches.delete(key))
            )
        })
    )
})

self.addEventListener('fetch',(evt) =>{
    console.log("doing a fetch call or http request",evt.request);
})

self.addEventListener('message',(evt) =>{
    console.log("message from web page");
})