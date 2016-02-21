import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    cabang: []
}

export default function intro(state = initialState, action = {}) {
    switch (action.type) {
        case types.REQUEST_CABANG:
            return state;
        case types.RECEIVE_CABANG:
        	return update(state, {
        		cabang: {$set: action.payload.cabang}
        	});
        default:
            return state;
    }
}