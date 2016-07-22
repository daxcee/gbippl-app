import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    event: [],
    page: 1
}

export default function event(state = initialState, action = {}) {
    var {payload} = action;
    switch (action.type) {
        case types.REQUEST_EVENT:
            return update(state, {
                page: {$set: payload.page}
            });
        case types.RECEIVE_EVENT:
            return update(state, {
                event: {$apply: (event) => {
                    if (payload.page === 1) {
                        return payload.event;
                    } else {
                        return [...event, ...payload.event];
                    }
                }},
                page: {$set: payload.page}
            });
        default:
            return state;
    }
}
