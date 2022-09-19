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
                navigator.serviceWorker.addEventListener('message',APP.onMsg);
            }

            //When new sw get registered or sw get changed
            navigator.serviceWorker.oncontrollerchange = (evt) =>{
                console.info("Seems like new sw got registered or previous one got updated");
            };

        }
    },
    sendMsg: function(){
        const btnNode = document.getElementById('message');
        btnNode.addEventListener('click',(evt) => {
            if(navigator.serviceWorker.controller){
                navigator.serviceWorker.controller.postMessage({ res : "Hii" });
            }
        })
    },
    onMsg: function({data}){
        console.log("Data recevied from service worker::",data);
    }
}

window.addEventListener('load',APP.init());
APP.sendMsg();