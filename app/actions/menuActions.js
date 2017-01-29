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

export function fetchAbout() {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            fetch(`http://api.gbippl.id/about`)
                .then(response => response.json())
                .then(json => {
                    var about = json;
                    dispatch(receiveAbout(about));
                    resolve(about);
                })
                .catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function fetchKhotbah(page) {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch(requestKhotbah(page));
            var slug = getState().cabang.activeCabang.slug;
            var isAll = getState().menus.isAllCabang;
            fetch('http://api.gbippl.id/khotbah/' + (!isAll ? slug : '') + '?page='+page)
                .then(response => response.json())
                .then((json) => {
                    var khotbah = json;
                    dispatch(receiveKhotbah(page, khotbah));
                    resolve(khotbah);
                }).catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        })
    }
}

export function fetchWeeklyNews() {
    return function(dispatch, getState) {
        return new Promise((resolve, reject) => {
            fetch('http://api.gbippl.id/weeklynews')
                .then(response => response.json())
                .then((json) => {
                    var videos = json;
                    dispatch(receiveWeeklyNews(videos));
                    resolve(videos);
                }).catch((err) => {
                    console.log(err);
                    resolve(false);
                });
        });
    }
}

export function requestKhotbah(pageKhotbah) {
    return {
        type: types.REQUEST_KHOTBAH,
        payload: {
            pageKhotbah
        }
    }
}

export function receiveKhotbah(pageKhotbah, khotbah) {
    return {
        type: types.RECEIVE_KHOTBAH,
        payload: {
            pageKhotbah,
            khotbah
        }
    }
}

export function receiveWeeklyNews(videos) {
    return {
        type: types.RECEIVE_WEEKLY_NEWS,
        payload: {
            videos
        }
    }
}

export function receiveAbout(about) {
    return {
        type: types.RECEIVE_ABOUT,
        payload: {
            about
        }
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

export function changeActiveKhotbah(khotbah) {
    return {
        type: types.CHANGE_ACTIVE_KHOTBAH,
        payload: {
            khotbah
        }
    }
}

export function setIsAllCabang(isAllCabang) {
    return {
        type: types.SET_IS_ALL_CABANG,
        payload: {
            isAllCabang
        }
    }
}

export function setFontSize(fontSize) {
    return {
        type: types.SET_FONT_SIZE,
        payload: {
            fontSize
        }
    }
}


