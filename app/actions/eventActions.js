import * as types from './actionTypes';

export function fetchEvent() {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(requestEvent());
            fetch('http://api.gbippl.id/event')
                .then(response => response.json())
                .then((json) => {
                    var event = json;
                    dispatch(receiveEvent(event));
                    resolve(event);
                }).catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function requestEvent() {
    return {
        type: types.REQUEST_EVENT,
    }
}

export function receiveEvent(event) {
    return {
        type: types.RECEIVE_EVENT,
        payload: {
            event
        }
    }
}