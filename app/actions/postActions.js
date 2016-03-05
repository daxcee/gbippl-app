import * as types from './actionTypes';

export function fetchPost() {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(requestPost());
            fetch(`http://api.gbippl.id/posts`)
                .then(response => response.json())
                .then(json => {
                    var posts = json;
                    dispatch(receivePost(posts));
                    resolve(posts);
                }).catch((err) => {
                    console.log(err);
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
                    console.log('JSON', json);
                    var post = json;
                    dispatch(receiveSinglePost(post));
                    dispatch(changeActivePost(post.id));
                    resolve(post);
                })
                .catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function requestPost() {
    return {
        type: types.REQUEST_POST,
    }
}

export function receivePost(posts) {
    return {
        type: types.RECEIVE_POST,
        payload: {
            posts
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

export function changeActivePost(id) {
    return {
        type: types.CHANGE_ACTIVE_POST,
        payload: {
            id
        }
    }
}