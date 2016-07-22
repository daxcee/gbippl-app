import * as types from './actionTypes';

export function fetchPeka(page) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(requestPeka(page));
            var slug = getState().cabang.activeCabang.slug;
            var isAll = getState().peka.isAll;
            fetch('http://api.gbippl.id/peka/' + (!isAll ? slug : '') + '?page='+page)
                .then(response => response.json())
                .then((json) => {
                    var peka = json;
                    dispatch(receivePeka(page, peka));
                    resolve(peka);
                }).catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function requestPeka(page) {
    return {
        type: types.REQUEST_PEKA,
        payload: {
            page
        }
    }
}

export function receivePeka(page, peka) {
    return {
        type: types.RECEIVE_PEKA,
        payload: {
            page,
            peka
        }
    }
}

export function setIsAll(isAll) {
    return {
        type: types.SET_IS_ALL,
        payload: {
            isAll
        }
    }
}
