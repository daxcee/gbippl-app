import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    gallery: [],
    page: 1
}

export default function gallery(state = initialState, action = {}) {
    var {payload} = action;
    switch (action.type) {
        case types.REQUEST_GALLERY:
            return update(state, {
                page: {$set: payload.page}
            });
        case types.RECEIVE_GALLERY:
            return update(state, {
                gallery: {$apply: (gallery) => {
                    if (payload.page === 1) {
                        return payload.gallery;
                    } else {
                        return [...gallery, ...payload.gallery];
                    }
                }},
                page: {$set: payload.page}
            });
        default:
            return state;
    }
}
