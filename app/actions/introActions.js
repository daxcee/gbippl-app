import * as types from './actionTypes';
import asyncStore from 'react-native-simple-store';

export function changeIntro() {
    return (dispatch) => {
        asyncStore.save('IntroLoaded', true);
    }
}
