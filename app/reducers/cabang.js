import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    cabang: [],
    activeCabang: {}
}

export default function cabang(state = initialState, action = {}) {
    switch (action.type) {
        case types.REQUEST_CABANG:
            return state;
        case types.RECEIVE_CABANG:
            return update(state, {
                cabang: {$set: action.payload.cabang},
                activeCabang: {$set: action.payload.cabang.filter(cabang => cabang.id == state.activeCabang.id)[0]}
            });
        case types.SELECT_CABANG:
            return update(state, {
                activeCabang: {$set: action.payload.cabang}
            });
        default:
            return state;
    }
}