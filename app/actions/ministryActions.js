import * as types from './actionTypes';

export function fetchMinistry(page) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(requestMinistry(page));
            fetch('http://api.gbippl.id/ministry?page='+page)
                .then(response => response.json())
                .then((json) => {
                    var ministry = json;
                    dispatch(receiveMinistry(page, ministry));
                    resolve(ministry);
                }).catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function requestMinistry(page) {
    return {
        type: types.REQUEST_MINISTRY,
        payload: {
            page
        }
    }
}

export function receiveMinistry(page, ministry) {
    return {
        type: types.RECEIVE_MINISTRY,
        payload: {
            page,
            ministry
        }
    }
}
