import {AsyncStorage} from 'react-native';

export default function api(uri, options = {}) {

    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token').then(token => {
            options.headers = Object.assign({}, options.headers, {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            });
            if (token) {
                options.headers = Object.assign({}, options.headers, {
                    'x-access-token': token
                });
            }
            console.log(options);
            fetch(uri, options)
                .then(response => {
                    if (response.status === 200) {
                        return resolve(response.json());
                    } else {
                        return response.json().then(error => {
                            alert(error.message);
                            return reject({status: response.status, message: error.message});    
                        });
                    }
                });
        });
    });
}