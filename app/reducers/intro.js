import * as types from '../actions/actionTypes';
import { AsyncStorage } from 'react-native';
import update from 'react-addons-update';

const initialState = {
    intro: false
}

export default function intro(state = initialState, action = {}) {
    switch (action.type) {
        case types.FINISH_INTRO:
            return update(state, {
                intro: {$set: true}
            });
        default:
            return state;
    }
}