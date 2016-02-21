import * as types from './actionTypes';
import axios from 'axios';

export function fetchEvent() {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(requestEvent());
            axios.get('http://api.gbippl.id/event')
                .then((response) => {
                    var event = response.data;
                    dispatch(receiveEvent(event));
                    resolve(event);
                }).catch(() => {
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