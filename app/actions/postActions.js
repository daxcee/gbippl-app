import * as types from './actionTypes';

export function fetchAppSettings() {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            fetch('http://api.gbippl.id/appsettings')
                .then(response => response.json())
                .then((json) => {
                    var appSettings = json;
                    console.log('APP SETTINGS', appSettings);
                    dispatch(receiveAppSettings(appSettings));
                    resolve(appSettings);
                }).catch((err) => {
                    resolve(false);
                });
        });
    }
}

export function fetchPost(page) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(requestPost(page));
            fetch('http://api.gbippl.id/posts?page='+page)
                .then(response => response.json())
                .then((json) => {
                    var posts = json;
                    dispatch(receivePost(page, posts));
                    resolve(posts);
                }).catch((err) => {
                    resolve(false);
                });
        });
    }
}

export function fetchPinned() {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            fetch('http://api.gbippl.id/pinned')
                .then(response => response.json())
                .then((json) => {
                    var posts = json;
                    dispatch(receivePinned(posts));
                    resolve(posts);
                }).catch((err) => {
                    resolve(false);
                });
        });
    }
}

export function fetchSinglePost(id) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            fetch(`http://api.gbippl.id/posts/${id}`)
                .then(response => response.json())
                .then(json => {
                    var post = json;
                    dispatch(receiveSinglePost(post));
                    dispatch(changeActivePost(post));
                    resolve(post);
                })
                .catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function requestPost(page) {
    return {
        type: types.REQUEST_POST,
        payload: {
            page
        }
    }
}

export function receivePost(page, posts) {
    return {
        type: types.RECEIVE_POST,
        payload: {
            page,
            posts
        }
    }
}

export function receivePinned(pinned) {
    return {
        type: types.RECEIVE_PINNED,
        payload: {
            pinned
        }
    }
}

export function receiveAppSettings(appSettings) {
    return {
        type: types.RECEIVE_APP_SETTINGS,
        payload: {
            appSettings
        }
    }
}


export function receiveSinglePost(post) {
    return {
        type: types.RECEIVE_SINGLE_POST,
        payload: {
            post
        }
    }
}

export function changeActivePost(post) {
    return {
        type: types.CHANGE_ACTIVE_POST,
        payload: {
            post
        }
    }
}
