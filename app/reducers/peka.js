import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    peka: [],
    page: 1,
    isAll: false
}

export default function peka(state = initialState, action = {}) {
    var {payload} = action;
    switch (action.type) {
        case types.REQUEST_PEKA:
            return update(state, {
                page: {$set: payload.page}
            });
        case types.RECEIVE_PEKA:
            return update(state, {
                peka: {$apply: (peka) => {
                    if (payload.page === 1) {
                        return payload.peka;
                    } else {
                        return [...peka, ...payload.peka];
                    }
                }},
                page: {$set: payload.page}
            });
        case types.SET_IS_ALL:
            return update(state, {
                isAll: {$set: payload.isAll}
            });
        default:
            return state;
    }
}
