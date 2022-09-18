/*Service Worker Events*/
self.addEventListener('install',(evt) =>{
    /*Install the changes without keep it in wait state*/
    //self.skipWaiting();
    //Wait until promise event get resolved
    evt.waitUntil(
        Promise.resolve().then(() =>{
            console.log("Event waitUntil triggered")
        }).then(() =>{
            console.log("Service worker installed");
        })
    )
})

self.addEventListener('active',(evt) =>{
    console.log("Service worker active");
    //Claim new changes 
    clients.claim.then(() =>{
        console.log("Event from claim")
    })
})

self.addEventListener('fetch',(evt) =>{
    console.log("doing a fetch call or http request",evt.request);
})

self.addEventListener('message',(evt) =>{
    console.log("message from web page");
})