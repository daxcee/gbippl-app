import * as types from './actionTypes';

export function fetchCabang() {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(requestCabang());
            fetch('http://api.gbippl.id/cabang')
                .then(response => response.json())
                .then((json) => {
                    var cabang = json;
                    dispatch(receiveCabang(cabang));
                    resolve(cabang);
                }).catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function requestCabang() {
    return {
        type: types.REQUEST_CABANG,
    }
}

export function receiveCabang(cabang) {
    return {
        type: types.RECEIVE_CABANG,
        payload: {
            cabang
        }
    }
}

export function selectCabang(cabang) {
    return {
        type: types.SELECT_CABANG,
        payload: {
            cabang
        }
    }
}