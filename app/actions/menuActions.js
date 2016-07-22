import * as types from './actionTypes';

export function fetchSinglePage(id) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            fetch(`http://api.gbippl.id/posts/${id}`)
                .then(response => response.json())
                .then(json => {
                    var menu = json;
                    dispatch(receiveSinglePage(menu));
                    resolve(menu);
                })
                .catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function receiveSinglePage(menu) {
    return {
        type: types.RECEIVE_SINGLE_PAGE,
        payload: {
            menu
        }
    }
}

export function changeActivePage(page) {
    return {
        type: types.CHANGE_ACTIVE_PAGE,
        payload: {
            page
        }
    }
}
