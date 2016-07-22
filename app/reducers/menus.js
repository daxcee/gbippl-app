import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    activePage: {}
}

export default function menus(state = initialState, action = {}) {
    switch (action.type) {
        case types.RECEIVE_SINGLE_PAGE:
            return update(state, {
                activePage: {$set: action.payload.menu}
            });
        case types.CHANGE_ACTIVE_PAGE:
            return update(state, {
                activePage: {$set: action.payload.page}
            });
        default:
            return state;
    }
}
