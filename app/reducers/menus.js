import * as types from '../actions/actionTypes';
import update from 'react-addons-update';

const initialState = {
    menus: {
        komunitas: [],
        profil: [],
    },
    activeMenu: {}
}

export default function menus(state = initialState, action = {}) {
    switch (action.type) {
        case types.REQUEST_MENU:
            return state;
        case types.RECEIVE_MENU:
            return update(state, {
                menus: {
                    [action.payload.type]: {$set: action.payload.menus}
                }
            });
        case types.RECEIVE_SINGLE_MENU:
            return update(state, {
                menus: {
                    [action.payload.type]: {$apply: (menus) => {
                        return menus.map((menu) => {
                            if (menu.page_id === action.payload.menu.id) {
                                return Object.assign(menu, action.payload.menu);
                            }
                            return menu;
                        })
                    }}
                }
            });
        case types.CHANGE_ACTIVE_MENU:
            return update(state, {
                activeMenu: {$set: state.menus[action.payload.type].filter((menu) => menu.page_id === action.payload.id)[0] || {}}
            });
        default:
            return state;
    }
}