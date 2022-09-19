/*Service Worker Events*/
const version = 9;
const staticName = `staticCache-${version}`;
const dynamicName = `dynamicache`;
const fontName = `fontCache`;
const imgName = `imagename`;

let assets = ['/index.html','/js/index.js','/css/index.css'];

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
    evt.respondWith(caches.match(evt.request).then(
        cache => {return cache || fetch(evt.request).then((fetchRes) =>{
                caches.open(staticName).then(
                    (cache) => {
                        cache.put(evt.request,fetchRes.clone())
                        return fetchRes;
                    }
                ).catch(() =>{
                    return fetch(evt.request);
                })
            }).catch(() => {
                /*Add a fallback page or error*/
                return fetch(evt.request);
            })
        }
    ))
})

self.addEventListener('message',async (evt) =>{
    const {data} = evt;
    const {id} = evt.source;
    const client = await clients.get(id);
    data.res = "Hii from service worker";
    return client.postMessage(data);
})