/*Service Worker Events*/
self.addEventListener('install',(evt) =>{
    console.log("Service worker install");
})

self.addEventListener('active',(evt) =>{
    console.log("Service worker active");
})

self.addEventListener('fetch',(evt) =>{
    console.log("doing a fetch call or http request",evt.request);
})

self.addEventListener('message',(evt) =>{
    console.log("message from web page");
})