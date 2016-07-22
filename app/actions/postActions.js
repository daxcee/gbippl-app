import * as types from './actionTypes';

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
