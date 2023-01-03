const API_URL = 'https://resolve.unstoppabledomains.com/domains/';
const API_KEY = '172813c9-26b5-473e-b1c2-a788ce5c0c8e';

function getDomainInfo(domain) {

    return new Promise((resolve, reject) => {

        let onLoad = function (e) {
            let response = JSON.parse(e.currentTarget.responseText);
            resolve(response);
        };
    
        let onError = function (e) {
            console.error('API Error', e);
            reject(e);
        };
    
        let xhr = new XMLHttpRequest();
        xhr.open("GET", API_URL + domain);
        xhr.setRequestHeader("Authorization", "Bearer " + API_KEY);	
        xhr.addEventListener('load', onLoad);
        xhr.addEventListener('error', onError);
        xhr.send();
    });
}

export { getDomainInfo };