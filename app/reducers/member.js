import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    member: null,
}

export default function gallery(state = initialState, action = {}) {
    var {payload} = action;
    switch (action.type) {
        case types.RECEIVE_MEMBER:
            return update(state, {
                member: {$set: payload.member}
            });
        default:
            return state;
    }
}
