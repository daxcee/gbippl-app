import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    activePage: {},
    about: {},
    khotbah: [],
    activeKhotbah: {},
    weeklyNews: [],
    isAllCabang: false,
    pageKhotbah: 1,
    fontSize: 13
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
        case types.RECEIVE_ABOUT:
            return update(state, {
                about: {$set: action.payload.about}
            });
        case types.RECEIVE_KHOTBAH:
            return update(state, {
                khotbah: {$apply: (khotbah) => {
                    if (action.payload.pageKhotbah == 1) {
                        return action.payload.khotbah;
                    } else {
                        return [...khotbah, ...action.payload.khotbah];
                    }
                }},
                pageKhotbah: {$set: action.payload.pageKhotbah}
            });
        case types.CHANGE_ACTIVE_KHOTBAH:
            return update(state, {
                activeKhotbah: {$set: action.payload.khotbah}
            });
        case types.REQUEST_KHOTBAH:
            return update(state, {
                pageKhotbah: {$set: action.payload.pageKhotbah}
            });
        case types.SET_IS_ALL_CABANG:
            return update(state, {
                isAllCabang: {$set: action.payload.isAllCabang}
            });
        case types.RECEIVE_WEEKLY_NEWS:
            return update(state, {
                weeklyNews: {$set: action.payload.videos}
            });
        case types.SET_FONT_SIZE:
            return update(state, {
                fontSize: {$set: action.payload.fontSize}
            });
        default:
            return state;
    }
}
