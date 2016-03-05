import * as types from './actionTypes';

export function fetchMenu(type) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(requestMenu());
            fetch('http://api.gbippl.id/menu/' + type)
                .then(response => response.json())
                .then((json) => {
                    var menus = json;
                    dispatch(receiveMenu(type, menus));
                    resolve(menus);
                }).catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function fetchSingleMenu(type, id) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            fetch(`http://api.gbippl.id/menus/${id}`)
                .then(response => response.json())
                .then(json => {
                    console.log('JSON', json);
                    var menu = json;
                    dispatch(receiveSingleMenu(type, menu));
                    dispatch(changeActiveMenu(type, menu.id));
                    resolve(menu);
                })
                .catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function requestMenu() {
    return {
        type: types.REQUEST_MENU,
    }
}

export function receiveMenu(type, menus) {
    return {
        type: types.RECEIVE_MENU,
        payload: {
            type, 
            menus
        }
    }
}

export function receiveSingleMenu(type, menu) {
    return {
        type: types.RECEIVE_SINGLE_MENU,
        payload: {
            type, 
            menu
        }
    }
}

export function changeActiveMenu(type, id) {
    return {
        type: types.CHANGE_ACTIVE_MENU,
        payload: {
            type, 
            id
        }
    }
}