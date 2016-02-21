import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    event: []
}

export default function event(state = initialState, action = {}) {
    switch (action.type) {
        case types.REQUEST_EVENT:
            return state;
        case types.RECEIVE_EVENT:
            return update(state, {
                event: {$set: action.payload.event}
            });
        default:
            return state;
    }
}