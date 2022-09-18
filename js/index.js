//Register Service Worker
const APP = {
    SW:null,
    init: function(){
            //Check browser support for service worker
            if('serviceWorker' in navigator){
                navigator.serviceWorker.register('./service-worker.js',{
                    scope:'/'
                }).then(register =>{
                    APP.SW = register.active || register.installing || register.waiting;
                    console.info("Service Worker regsitered");
                })
            
            //Check service worker already registered or not    
            if(navigator.serviceWorker.controller){
                console.info("service worker already registered");
            }

            //When new sw get registered or sw get changed
            navigator.serviceWorker.oncontrollerchange = (evt) =>{
                console.info("Seems like new sw got registered or previous one got updated");
            };

        }
    }
}

window.addEventListener('load',APP.init());