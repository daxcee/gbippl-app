import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    ministry: [],
    page: 1
}

export default function ministry(state = initialState, action = {}) {
    var {payload} = action;
    switch (action.type) {
        case types.REQUEST_MINISTRY:
            return update(state, {
                page: {$set: payload.page}
            });
        case types.RECEIVE_MINISTRY:
            return update(state, {
                ministry: {$apply: (ministry) => {
                    if (payload.page === 1) {
                        return payload.ministry;
                    } else {
                        return [...ministry, ...payload.ministry];
                    }
                }},
                page: {$set: payload.page}
            });
        default:
            return state;
    }
}
