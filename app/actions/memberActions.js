import * as types from './actionTypes';
import {AsyncStorage} from 'react-native';
import api from '../helpers/api';

export function login(member) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            console.log({
                email: member.email,
                password: member.password
            });
            api('http://api.gbippl.id/kaj/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: member.email,
                    password: member.password
                })
            })
                .then((json) => {
                    console.log('LOGIN', json);
                    AsyncStorage.setItem('token', json.token);
                    dispatch(receiveMember(json));
                    resolve(json);
                });
        });
    }
}

export function register(member) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            api('http://api.gbippl.id/kaj/members', {
                method: 'POST',
                body: JSON.stringify(member)
            })
                .then((json) => {
                    resolve(json);
                });
        });
    }
}

export function logout() {
    return function(dispatch, getState) {
        AsyncStorage.removeItem('token');
        dispatch(receiveMember(null));
    }
}

export function receiveMember(member) {
    return {
        type: types.RECEIVE_MEMBER,
        payload: {
            member
        }
    }
}
