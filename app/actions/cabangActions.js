import * as types from './actionTypes';
import axios from 'axios';

export function fetchCabang() {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(requestCabang());
            axios.get('http://api.gbippl.id/cabang')
                .then((response) => {
                    var cabang = response.data;
                    dispatch(receiveCabang(cabang));
                    resolve(cabang);
                }).catch(() => {
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