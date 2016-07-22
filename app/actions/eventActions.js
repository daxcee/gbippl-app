import * as types from './actionTypes';

export function fetchEvent(page) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(requestEvent(page));
            fetch('http://api.gbippl.id/event?page='+page)
                .then(response => response.json())
                .then((json) => {
                    var event = json;
                    dispatch(receiveEvent(page, event));
                    resolve(event);
                }).catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function requestEvent(page) {
    return {
        type: types.REQUEST_EVENT,
        payload: {
            page
        }
    }
}

export function receiveEvent(page, event) {
    return {
        type: types.RECEIVE_EVENT,
        payload: {
            page,
            event
        }
    }
}
