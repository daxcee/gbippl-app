import * as types from './actionTypes';

export function fetchGallery(page) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(requestGallery(page));
            fetch('http://api.gbippl.id/gallery?page='+page)
                .then(response => response.json())
                .then((json) => {
                    var gallery = json;
                    dispatch(receiveGallery(page, gallery));
                    resolve(gallery);
                }).catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function requestGallery(page) {
    return {
        type: types.REQUEST_GALLERY,
        payload: {
            page
        }
    }
}

export function receiveGallery(page, gallery) {
    return {
        type: types.RECEIVE_GALLERY,
        payload: {
            page,
            gallery
        }
    }
}